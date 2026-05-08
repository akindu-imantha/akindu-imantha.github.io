import { createHash } from 'node:crypto';

const MAX_RECENT_VISITS = 40;

function getRedisConfig() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  return { url, token };
}

export function isAnalyticsConfigured() {
  const { url, token } = getRedisConfig();
  return Boolean(url && token);
}

function clean(value, fallback = 'unknown') {
  const text = String(value ?? '').trim();
  return text || fallback;
}

function clampText(value, maxLength = 180) {
  return clean(value).slice(0, maxLength);
}

function clampNumber(value, min = 0, max = 86400) {
  const number = Number(value);

  if (!Number.isFinite(number)) return min;

  return Math.min(Math.max(Math.round(number), min), max);
}

function getRequestIp(request) {
  const forwardedFor = request.headers['x-forwarded-for'];
  const firstForwardedIp = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor?.split(',')[0];

  return clean(
    request.headers['x-real-ip'] ??
      firstForwardedIp ??
      request.socket?.remoteAddress ??
      request.connection?.remoteAddress,
  );
}

function hashValue(value) {
  return createHash('sha256').update(String(value)).digest('hex').slice(0, 24);
}

function detectBrowser(userAgent) {
  const value = userAgent.toLowerCase();

  if (value.includes('edg/')) return 'Edge';
  if (value.includes('chrome/') && !value.includes('chromium')) return 'Chrome';
  if (value.includes('safari/') && !value.includes('chrome/')) return 'Safari';
  if (value.includes('firefox/')) return 'Firefox';
  if (value.includes('opr/') || value.includes('opera')) return 'Opera';

  return 'Other';
}

function detectOs(userAgent) {
  const value = userAgent.toLowerCase();

  if (value.includes('windows')) return 'Windows';
  if (value.includes('android')) return 'Android';
  if (value.includes('iphone') || value.includes('ipad')) return 'iOS';
  if (value.includes('mac os') || value.includes('macintosh')) return 'macOS';
  if (value.includes('linux')) return 'Linux';

  return 'Other';
}

function normalizeDevice(device, userAgent) {
  const value = clean(device, '').toLowerCase();

  if (['mobile', 'tablet', 'desktop'].includes(value)) {
    return value[0].toUpperCase() + value.slice(1);
  }

  if (/mobile|iphone|android/.test(userAgent.toLowerCase())) return 'Mobile';
  if (/ipad|tablet/.test(userAgent.toLowerCase())) return 'Tablet';

  return 'Desktop';
}

function toObject(hashResult) {
  if (hashResult && typeof hashResult === 'object' && !Array.isArray(hashResult)) {
    return Object.fromEntries(
      Object.entries(hashResult).map(([key, value]) => [key, Number(value) || 0]),
    );
  }

  if (!Array.isArray(hashResult)) return {};

  const data = {};

  for (let index = 0; index < hashResult.length; index += 2) {
    data[hashResult[index]] = Number(hashResult[index + 1]) || 0;
  }

  return data;
}

function topEntries(data, limit = 8) {
  return Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

async function redisPipeline(commands) {
  const { url, token } = getRedisConfig();

  if (!url || !token) {
    throw new Error('Analytics storage is not configured.');
  }

  const response = await fetch(`${url.replace(/\/$/, '')}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
  });

  if (!response.ok) {
    throw new Error(`Analytics storage failed with ${response.status}.`);
  }

  return response.json();
}

export async function recordAnalyticsVisit(request, payload = {}) {
  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  const userAgent = clean(request.headers['user-agent']);
  const ipHash = hashValue(getRequestIp(request));
  const visitorId = hashValue(clean(payload.visitorId, ipHash));
  const path = clampText(payload.path ?? '/');
  const eventType = clampText(payload.type, 40);
  const eventName = clampText(payload.eventName, 80);
  const eventLabel = clampText(payload.label, 180);
  const eventValue = clampNumber(payload.value);
  const device = normalizeDevice(payload.device, userAgent);
  const browser = detectBrowser(userAgent);
  const os = detectOs(userAgent);
  const country = clean(request.headers['x-vercel-ip-country'] ?? request.headers['cf-ipcountry'], 'Unknown');
  const isEvent = eventType === 'event';
  const isReturningVisitor = payload.isReturning === true;

  const recentVisit = {
    at: now.toISOString(),
    path,
    device,
    browser,
    os,
    country,
    language: clampText(payload.language, 40),
    timezone: clampText(payload.timezone, 80),
    referrer: clampText(payload.referrer, 220),
  };

  const commands = [
    ['PFADD', 'analytics:visitors:all', visitorId],
    ['PFADD', `analytics:visitors:${day}`, visitorId],
  ];

  if (isReturningVisitor) {
    commands.push(['PFADD', 'analytics:returning:all', visitorId]);
  }

  if (isEvent) {
    const name = eventName || 'unknown_event';
    const label = eventLabel || path;
    const combinedEvent = `${name}: ${label}`.slice(0, 220);

    commands.push(
      ['INCR', 'analytics:events:total'],
      ['HINCRBY', 'analytics:events:by-name', name, 1],
      ['HINCRBY', 'analytics:events:by-label', combinedEvent, 1],
      ['HINCRBY', 'analytics:events:by-day', day, 1],
    );

    if (name === 'time_on_page') {
      commands.push(
        ['HINCRBY', 'analytics:time:seconds:total', 'value', eventValue],
        ['HINCRBY', 'analytics:time:seconds:by-path', path, eventValue],
      );
    }
  } else {
    commands.push(
      ['INCR', 'analytics:pageviews:total'],
      ['HINCRBY', 'analytics:pageviews:by-day', day, 1],
      ['HINCRBY', 'analytics:pageviews:by-path', path, 1],
      ['HINCRBY', 'analytics:devices', device, 1],
      ['HINCRBY', 'analytics:browsers', browser, 1],
      ['HINCRBY', 'analytics:os', os, 1],
      ['HINCRBY', 'analytics:countries', country, 1],
      ['LPUSH', 'analytics:recent', JSON.stringify(recentVisit)],
      ['LTRIM', 'analytics:recent', 0, MAX_RECENT_VISITS - 1],
    );
  }

  await redisPipeline(commands);

  return { ok: true };
}

export async function getAnalyticsSummary() {
  const results = await redisPipeline([
    ['GET', 'analytics:pageviews:total'],
    ['PFCOUNT', 'analytics:visitors:all'],
    ['HGETALL', 'analytics:pageviews:by-day'],
    ['HGETALL', 'analytics:pageviews:by-path'],
    ['HGETALL', 'analytics:devices'],
    ['HGETALL', 'analytics:browsers'],
    ['HGETALL', 'analytics:os'],
    ['HGETALL', 'analytics:countries'],
    ['LRANGE', 'analytics:recent', 0, MAX_RECENT_VISITS - 1],
    ['GET', 'analytics:events:total'],
    ['HGETALL', 'analytics:events:by-name'],
    ['HGETALL', 'analytics:events:by-label'],
    ['HGETALL', 'analytics:time:seconds:total'],
    ['HGETALL', 'analytics:time:seconds:by-path'],
    ['PFCOUNT', 'analytics:returning:all'],
  ]);

  const days = toObject(results[2]?.result);
  const recent = (results[8]?.result ?? [])
    .map((item) => {
      try {
        return JSON.parse(item);
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  return {
    totalPageviews: Number(results[0]?.result) || 0,
    uniqueVisitors: Number(results[1]?.result) || 0,
    returningVisitors: Number(results[14]?.result) || 0,
    totalEvents: Number(results[9]?.result) || 0,
    totalTimeSeconds: Number(toObject(results[12]?.result).value) || 0,
    daily: Object.entries(days)
      .sort(([left], [right]) => left.localeCompare(right))
      .slice(-14)
      .map(([date, count]) => ({ date, count })),
    topPages: topEntries(toObject(results[3]?.result), 10),
    devices: topEntries(toObject(results[4]?.result)),
    browsers: topEntries(toObject(results[5]?.result)),
    operatingSystems: topEntries(toObject(results[6]?.result)),
    countries: topEntries(toObject(results[7]?.result)),
    events: topEntries(toObject(results[10]?.result), 12),
    eventDetails: topEntries(toObject(results[11]?.result), 14),
    timeByPage: topEntries(toObject(results[13]?.result), 10),
    recent,
  };
}

export function hasValidAnalyticsToken(request) {
  const adminToken = process.env.ANALYTICS_ADMIN_TOKEN;

  if (!adminToken) return false;

  const authorization = clean(request.headers.authorization, '');
  const headerToken = clean(request.headers['x-analytics-token'], '');
  const bearerToken = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : '';

  return bearerToken === adminToken || headerToken === adminToken;
}
