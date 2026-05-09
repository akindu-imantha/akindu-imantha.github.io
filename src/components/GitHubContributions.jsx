import { Github } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DEFAULT_API_URL = 'https://akindu-portfolio-api.vercel.app/api/github/contributions';

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

export default function GitHubContributions({ data = {}, ui = {}, className = '' }) {
  const currentYear = new Date().getFullYear();
  const username = data.username ?? 'akindu-imantha';
  const apiUrl = getApiUrl(data.apiUrl);
  const [calendar, setCalendar] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!apiUrl) {
      setStatus('unconfigured');
      return;
    }

    const controller = new AbortController();
    const url = new URL(apiUrl, window.location.origin);

    url.searchParams.set('username', username);
    url.searchParams.set('year', String(currentYear));

    setStatus('loading');

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Contribution request failed');
        }

        return response.json();
      })
      .then((payload) => {
        setCalendar(payload);
        setStatus('ready');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setStatus('error');
        }
      });

    return () => controller.abort();
  }, [apiUrl, currentYear, username]);

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

      {status === 'loading' ? (
        <GitHubCalendarSkeleton />
      ) : status === 'ready' && calendar ? (
        <>
          <p className="github-total">
            {calendar.totalContributions} contributions in {calendar.year}
          </p>
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
          {status === 'loading'
            ? ui.githubLoading ?? 'Loading latest GitHub activity...'
            : ui.githubUnavailable ?? 'Live GitHub contributions need the backend GitHub API settings to be configured.'}
        </p>
      )}
    </article>
  );
}
