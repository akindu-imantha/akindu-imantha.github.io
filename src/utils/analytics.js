const VISITOR_ID_KEY = 'portfolio-visitor-id';
const DEFAULT_ENDPOINT = '/api/analytics';

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

function getDeviceType() {
  const width = window.screen?.width ?? window.innerWidth;
  const hasTouch = navigator.maxTouchPoints > 0;

  if (width <= 767 && hasTouch) return 'mobile';
  if (width <= 1024 && hasTouch) return 'tablet';

  return 'desktop';
}

export function trackPageView(path = window.location.pathname + window.location.hash) {
  if (path.startsWith('/#analytics') || window.location.hash.startsWith('#analytics')) {
    return;
  }

  const endpoint = getAnalyticsEndpoint();
  const payload = {
    visitorId: getVisitorId(),
    path,
    referrer: document.referrer,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    device: getDeviceType(),
    screen: `${window.screen?.width ?? 0}x${window.screen?.height ?? 0}`,
  };
  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon(endpoint, blob);
    return;
  }

  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {});
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
