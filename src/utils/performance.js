export function shouldUseLitePerformanceMode() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  const params = new URLSearchParams(window.location.search);
  const forcedMode = params.get('performance') ?? localStorage.getItem('portfolio-performance');

  if (forcedMode === 'full') return false;
  if (forcedMode === 'lite') return true;

  const connection = navigator.connection ?? navigator.mozConnection ?? navigator.webkitConnection;
  const hasReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const hasLowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;
  const hasFewCores = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
  const savesData = Boolean(connection?.saveData);
  const slowNetwork = typeof connection?.effectiveType === 'string' && /(^2g$|^3g$|slow-2g)/i.test(connection.effectiveType);

  return Boolean(hasReducedMotion || hasLowMemory || hasFewCores || savesData || slowNetwork);
}
