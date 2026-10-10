import { Github } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DEFAULT_API_URL = 'https://akindu-portfolio-api.vercel.app/api/github/contributions';
const CACHE_TTL = 1000 * 60 * 60 * 24;
const REQUEST_TIMEOUT = 10000;

function getLevel(count) {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

function getMonthMarkers(weeks = []) {
  const markers = [];
  let lastMonth = -1;

  weeks.forEach((week, index) => {
    const firstDay = week.contributionDays?.[0];

    if (!firstDay) {
      return;
    }

    const month = new Date(`${firstDay.date}T00:00:00`).getMonth();

    if (month !== lastMonth) {
      markers.push({ label: monthLabels[month], column: index + 1 });
      lastMonth = month;
    }
  });

  return markers;
}

function getApiUrl(dataApiUrl) {
  const configuredUrl = dataApiUrl ?? import.meta.env.VITE_GITHUB_CONTRIBUTIONS_API_URL;
  const isLocalPage = ['localhost', '127.0.0.1'].includes(window.location.hostname);

  if (!configuredUrl) return DEFAULT_API_URL;

  try {
    const url = new URL(configuredUrl, window.location.origin);
    const isLocalApi = ['localhost', '127.0.0.1'].includes(url.hostname);

    if (!isLocalPage && isLocalApi) {
      return DEFAULT_API_URL;
    }
  } catch {
    return DEFAULT_API_URL;
  }

  return configuredUrl;
}

function getCacheKey(username, year) {
  return `portfolio-github-calendar:${username}:${year}`;
}

function isCalendar(payload) {
  return Boolean(payload
    && Number.isFinite(payload.totalContributions)
    && Array.isArray(payload.weeks));
}

function readCachedCalendar(username, year) {
  try {
    const cached = JSON.parse(localStorage.getItem(getCacheKey(username, year)) ?? 'null');
    return isCalendar(cached?.calendar) ? cached : null;
  } catch {
    return null;
  }
}

function saveCachedCalendar(username, year, calendar) {
  try {
    localStorage.setItem(getCacheKey(username, year), JSON.stringify({
      calendar,
      savedAt: Date.now(),
      expiresAt: Date.now() + CACHE_TTL,
    }));
  } catch {
    // Storage may be disabled; live data still remains usable for this visit.
  }
}

async function fetchCalendar(url, controller) {
  const response = await fetch(url, { signal: controller.signal, cache: 'no-store' });
  if (!response.ok) throw new Error('Contribution request failed');

  const payload = await response.json();
  if (!isCalendar(payload)) throw new Error('Contribution response was invalid');
  return payload;
}

function GitHubCalendarSkeleton() {
  return (
    <div className="github-skeleton" aria-hidden="true">
      <span className="github-skeleton-line" />
      <div className="github-skeleton-grid">
        {Array.from({ length: 78 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
    </div>
  );
}

export default function GitHubContributions({ data = {}, ui = {}, className = '', litePerformanceMode = false }) {
  const currentYear = new Date().getFullYear();
  const username = data.username ?? 'akindu-imantha';
  const apiUrl = getApiUrl(data.apiUrl);
  const [cachedEntry] = useState(() => readCachedCalendar(username, currentYear));
  const [calendar, setCalendar] = useState(() => cachedEntry?.calendar ?? null);
  const [status, setStatus] = useState(() => cachedEntry?.calendar ? 'cached' : 'loading');
  const [lastUpdated, setLastUpdated] = useState(() => cachedEntry?.savedAt ?? null);
  const hasInitialCalendar = Boolean(cachedEntry?.calendar);

  useEffect(() => {
    // The calendar is supplementary. On a slow/data-saver connection, avoid
    // an extra cross-origin request during the first paint.
    if (litePerformanceMode) {
      setStatus(hasInitialCalendar ? 'cached' : 'deferred');
      return undefined;
    }

    if (!apiUrl) {
      setStatus('unconfigured');
      return;
    }

    const url = new URL(apiUrl, window.location.origin);

    url.searchParams.set('username', username);
    url.searchParams.set('year', String(currentYear));

    let disposed = false;
    let activeController = null;
    let timeoutId = null;
    setStatus(hasInitialCalendar ? 'refreshing' : 'loading');

    const load = async () => {
      // A second attempt handles temporary Vercel cold starts and brief Wi-Fi
      // drops without making the page wait indefinitely.
      for (let attempt = 0; attempt < 2 && !disposed; attempt += 1) {
        activeController = new AbortController();
        let requestTimedOut = false;
        timeoutId = window.setTimeout(() => {
          requestTimedOut = true;
          activeController?.abort();
        }, REQUEST_TIMEOUT);

        try {
          const payload = await fetchCalendar(url, activeController);
          if (disposed) return;
          saveCachedCalendar(username, currentYear, payload);
          setCalendar(payload);
          setLastUpdated(Date.now());
          setStatus('ready');
          return;
        } catch (error) {
          if (disposed || (error.name === 'AbortError' && !requestTimedOut)) return;
          if (attempt === 0) {
            await new Promise((resolve) => window.setTimeout(resolve, 700));
          }
        } finally {
          window.clearTimeout(timeoutId);
          timeoutId = null;
        }
      }

      if (!disposed) setStatus(hasInitialCalendar ? 'stale' : 'error');
    };

    load();
    return () => {
      disposed = true;
      window.clearTimeout(timeoutId);
      activeController?.abort();
    };
  }, [apiUrl, currentYear, hasInitialCalendar, litePerformanceMode, username]);

  const monthMarkers = useMemo(() => getMonthMarkers(calendar?.weeks), [calendar]);

  return (
    <article className={['github-card', 'console-card', className].filter(Boolean).join(' ')}>
      <div className="github-card-header">
        <div className="github-card-title">
          <Github size={22} />
          <div>
            <p className="project-stack">{ui.githubEyebrow ?? 'github activity'}</p>
            <h3>{data.title ?? 'GitHub contributions'}</h3>
          </div>
        </div>
        <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="project-link secondary github-profile-link">
          {ui.githubProfileLink ?? 'View GitHub'}
        </a>
      </div>

      {status === 'loading' && !calendar ? (
        <GitHubCalendarSkeleton />
      ) : calendar ? (
        <>
          <p className="github-total">
            {calendar.totalContributions} contributions in {calendar.year}
          </p>
          {status === 'stale' ? (
            <p className="github-state">
              {ui.githubCached ?? 'Showing your most recently saved activity while the live update is unavailable.'}
              {lastUpdated ? ` Last updated ${new Date(lastUpdated).toLocaleDateString()}.` : ''}
            </p>
          ) : litePerformanceMode ? (
            <p className="github-state">
              {ui.githubLiteMode ?? 'Calendar loaded in performance mode.'}
            </p>
          ) : null}
          <div className="github-calendar-shell" aria-label={`${calendar.totalContributions} GitHub contributions in ${calendar.year}`}>
            <div className="github-months" style={{ gridTemplateColumns: `repeat(${calendar.weeks.length}, 12px)` }}>
              {monthMarkers.map((marker) => (
                <span key={`${marker.label}-${marker.column}`} style={{ gridColumn: marker.column }}>
                  {marker.label}
                </span>
              ))}
            </div>
            <div className="github-calendar" style={{ gridTemplateColumns: `repeat(${calendar.weeks.length}, 12px)` }}>
              {calendar.weeks.flatMap((week) =>
                week.contributionDays.map((day) => (
                  <span
                    key={day.date}
                    className={`github-day github-day--${getLevel(day.contributionCount)}`}
                    title={`${day.contributionCount} contributions on ${day.date}`}
                    aria-label={`${day.contributionCount} contributions on ${day.date}`}
                  />
                )),
              )}
            </div>
          </div>
        </>
      ) : (
        <p className="github-state">
          {status === 'deferred'
            ? ui.githubLiteMode ?? 'Live activity is paused to keep this page fast on your connection.'
            : status === 'loading'
            ? ui.githubLoading ?? 'Loading latest GitHub activity...'
            : ui.githubUnavailable ?? 'Live GitHub contributions need the backend GitHub API settings to be configured.'}
        </p>
      )}
    </article>
  );
}
