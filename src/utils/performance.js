export function shouldUseLitePerformanceMode() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  const params = new URLSearchParams(window.location.search);
  const forcedMode = params.get('performance') ?? localStorage.getItem('portfolio-performance');

  if (forcedMode === 'full') return false;
  if (forcedMode === 'lite') return true;

  const hasReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // Device memory and CPU counts are unreliable, and using them made the
  // opening experience differ between phones and desktops. The intro itself
  // is now lightweight enough to use everywhere; only an explicit request or
  // the user's accessibility preference enables the simplified mode.
  return Boolean(hasReducedMotion);
}
