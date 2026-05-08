const VISITOR_ID_KEY = 'portfolio-visitor-id';
const VISITOR_SEEN_KEY = 'portfolio-visitor-seen';
const DEFAULT_ENDPOINT = 'https://akindu-portfolio-api.vercel.app/api/analytics';

function getAnalyticsEndpoint() {
  return import.meta.env.VITE_ANALYTICS_API_URL || DEFAULT_ENDPOINT;
}

function getVisitorId() {
  const existingId = localStorage.getItem(VISITOR_ID_KEY);

  if (existingId) return existingId;

  const id = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  localStorage.setItem(VISITOR_ID_KEY, id);
  return id;
}

function isReturningVisitor() {
  const hasSeenBefore = localStorage.getItem(VISITOR_SEEN_KEY) === 'true';
  localStorage.setItem(VISITOR_SEEN_KEY, 'true');
  return hasSeenBefore;
}

function getDeviceType() {
  const width = window.screen?.width ?? window.innerWidth;
  const hasTouch = navigator.maxTouchPoints > 0;

  if (width <= 767 && hasTouch) return 'mobile';
  if (width <= 1024 && hasTouch) return 'tablet';

  return 'desktop';
}

function sendAnalyticsPayload(payload) {
  const endpoint = getAnalyticsEndpoint();
  const body = JSON.stringify(payload);

  fetch(endpoint, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon(endpoint, blob);
    }
  });
}

export function trackPageView(path = window.location.pathname + window.location.hash) {
  if (path.startsWith('/#analytics') || window.location.hash.startsWith('#analytics')) {
    return;
  }

  const payload = {
    visitorId: getVisitorId(),
    isReturning: isReturningVisitor(),
    path,
    referrer: document.referrer,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    device: getDeviceType(),
    screen: `${window.screen?.width ?? 0}x${window.screen?.height ?? 0}`,
  };

  sendAnalyticsPayload(payload);
}

export function trackEvent(eventName, details = {}) {
  if (window.location.hash.startsWith('#analytics')) {
    return;
  }

  sendAnalyticsPayload({
    type: 'event',
    visitorId: getVisitorId(),
    isReturning: localStorage.getItem(VISITOR_SEEN_KEY) === 'true',
    eventName,
    path: window.location.pathname + window.location.hash,
    label: details.label,
    value: details.value,
    referrer: document.referrer,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    device: getDeviceType(),
  });
}

export function startTimeOnPageTracking() {
  let startedAt = Date.now();
  let lastPath = window.location.pathname + window.location.hash;

  const flush = () => {
    const seconds = Math.round((Date.now() - startedAt) / 1000);

    if (seconds >= 3) {
      trackEvent('time_on_page', {
        label: lastPath,
        value: seconds,
      });
    }

    startedAt = Date.now();
    lastPath = window.location.pathname + window.location.hash;
  };

  const handleVisibility = () => {
    if (document.visibilityState === 'hidden') {
      flush();
    } else {
      startedAt = Date.now();
      lastPath = window.location.pathname + window.location.hash;
    }
  };

  window.addEventListener('pagehide', flush);
  document.addEventListener('visibilitychange', handleVisibility);

  return () => {
    flush();
    window.removeEventListener('pagehide', flush);
    document.removeEventListener('visibilitychange', handleVisibility);
  };
}

export async function fetchAnalyticsSummary(token) {
  const response = await fetch(getAnalyticsEndpoint(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Analytics could not be loaded.');
  }

  return data;
}

export async function clearAnalyticsSummary(token) {
  const response = await fetch(getAnalyticsEndpoint(), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Analytics could not be cleared.');
  }

  return data;
}
