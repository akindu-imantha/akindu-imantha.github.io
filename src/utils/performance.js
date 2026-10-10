export function shouldUseLitePerformanceMode() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  const params = new URLSearchParams(window.location.search);
  const forcedMode = params.get('performance') ?? localStorage.getItem('portfolio-performance');

  if (forcedMode === 'full') return false;
  if (forcedMode === 'lite') return true;

  const hasReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const isSlowConnection = Boolean(
    connection?.saveData
      || ['slow-2g', '2g'].includes(connection?.effectiveType),
  );

  // Do not use device-memory or CPU guesses: they are inconsistent across
  // browsers. Data Saver and the Network Information API are direct signals
  // that downloading and painting the full visual treatment would be costly.
  return Boolean(hasReducedMotion || isSlowConnection);
}
