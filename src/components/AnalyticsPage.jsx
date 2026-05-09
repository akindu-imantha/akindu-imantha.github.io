import { BarChart3, Clock3, Lock, MousePointerClick, MonitorSmartphone, RefreshCw, Repeat2, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { clearAnalyticsSummary, fetchAnalyticsSummary } from '../utils/analytics';

const TOKEN_KEY = 'portfolio-analytics-token';

function MetricCard({ icon: Icon, label, value }) {
  return (
    <article className="analytics-metric">
      <Icon size={20} />
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

const CHART_COLORS = ['#22c55e', '#38bdf8', '#a78bfa', '#f59e0b', '#fb7185'];

function polarToCartesian(center, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;

  return {
    x: center + radius * Math.cos(angleInRadians),
    y: center + radius * Math.sin(angleInRadians),
  };
}

function describeArc(center, radius, startAngle, endAngle) {
  const start = polarToCartesian(center, radius, endAngle);
  const end = polarToCartesian(center, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
}

function BarChart({ items = [], max }) {
  return (
    <div className="analytics-chart analytics-chart--bars" aria-hidden="true">
      {items.slice(0, 6).map((item, index) => (
        <span
          key={item.name}
          style={{
            '--bar-height': `${Math.max((item.count / max) * 100, 8)}%`,
            '--chart-color': CHART_COLORS[index % CHART_COLORS.length],
          }}
        />
      ))}
    </div>
  );
}

function DonutChart({ items = [] }) {
  const total = items.reduce((sum, item) => sum + item.count, 0);
  let cursor = 0;

  return (
    <svg className="analytics-chart analytics-chart--donut" viewBox="0 0 120 120" role="img" aria-label="Distribution chart">
      <circle cx="60" cy="60" r="42" />
      {items.slice(0, 5).map((item, index) => {
        const share = total ? item.count / total : 0;
        const start = cursor;
        const end = cursor + share * 359.99;
        cursor = end;

        return (
          <path
            key={item.name}
            d={describeArc(60, 42, start, end)}
            style={{ '--chart-color': CHART_COLORS[index % CHART_COLORS.length] }}
          />
        );
      })}
    </svg>
  );
}

function LineChart({ items = [], max }) {
  const chartItems = items.slice(-8);
  const points = chartItems
    .map((item, index) => {
      const x = chartItems.length === 1 ? 50 : (index / (chartItems.length - 1)) * 100;
      const y = 100 - (item.count / max) * 88;

      return `${x},${Math.max(y, 8)}`;
    })
    .join(' ');

  return (
    <svg className="analytics-chart analytics-chart--line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={points} />
    </svg>
  );
}

function RankingList({ title, items = [], chartType = 'bar' }) {
  const max = Math.max(...items.map((item) => item.count), 1);
  const hasItems = items.length > 0;

  return (
    <section className="analytics-panel">
      <div className="analytics-panel-heading">
        <h2>{title}</h2>
        {hasItems && chartType === 'bar' ? <BarChart items={items} max={max} /> : null}
        {hasItems && chartType === 'donut' ? <DonutChart items={items} /> : null}
        {hasItems && chartType === 'line' ? <LineChart items={items} max={max} /> : null}
      </div>
      <div className="analytics-ranking">
        {hasItems ? (
          items.map((item) => (
            <div className="analytics-rank-row" key={item.name}>
              <div>
                <span>{item.name}</span>
                <strong>{item.count}</strong>
              </div>
              <span style={{ '--bar-width': `${Math.max((item.count / max) * 100, 5)}%` }} />
            </div>
          ))
        ) : (
          <p className="analytics-empty">No data yet.</p>
        )}
      </div>
    </section>
  );
}

function formatTime(value) {
  if (!value) return 'Unknown';

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function formatDuration(seconds = 0) {
  const totalSeconds = Number(seconds) || 0;
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  if (minutes <= 0) return `${remainingSeconds}s`;

  return `${minutes}m ${remainingSeconds}s`;
}

export default function AnalyticsPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) ?? '');
  const [tokenInput, setTokenInput] = useState(token);
  const [summary, setSummary] = useState(null);
  const [status, setStatus] = useState(token ? 'loading' : 'locked');
  const [error, setError] = useState('');

  const latestDayCount = useMemo(() => {
    if (!summary?.daily?.length) return 0;
    return summary.daily[summary.daily.length - 1].count;
  }, [summary]);

  const loadSummary = async (activeToken = token) => {
    if (!activeToken) {
      setStatus('locked');
      return;
    }

    setStatus('loading');
    setError('');

    try {
      const data = await fetchAnalyticsSummary(activeToken);
      setSummary(data);
      setStatus('ready');
      sessionStorage.setItem(TOKEN_KEY, activeToken);
    } catch (loadError) {
      setError(loadError.message);
      setStatus('error');
    }
  };

  useEffect(() => {
    if (token) {
      loadSummary(token);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextToken = tokenInput.trim();
    setToken(nextToken);
    loadSummary(nextToken);
  };

  const handleClear = async () => {
    if (!token) {
      setStatus('locked');
      return;
    }

    const shouldClear = window.confirm('Clear all analytics data? This cannot be undone.');

    if (!shouldClear) return;

    setStatus('loading');
    setError('');

    try {
      await clearAnalyticsSummary(token);
      await loadSummary(token);
    } catch (clearError) {
      setError(clearError.message);
      setStatus('error');
    }
  };

  return (
    <main className="analytics-page">
      <header className="analytics-header">
        <a href="/#console" className="secondary-button analytics-back-link">
          Back
        </a>
        <div>
          <p className="eyebrow">Private dashboard</p>
          <h1>Portfolio Analytics</h1>
          <p>
            Page views, approximate unique visitors, device types, browsers, countries, and recent visits.
            MAC addresses are not available to websites.
          </p>
        </div>
      </header>

      <form className="analytics-auth" onSubmit={handleSubmit}>
        <Lock size={18} />
        <input
          type="password"
          value={tokenInput}
          onChange={(event) => setTokenInput(event.target.value)}
          placeholder="Analytics admin token"
          aria-label="Analytics admin token"
        />
        <button type="submit" className="primary-button">
          Unlock
        </button>
        <button type="button" className="secondary-button analytics-refresh" onClick={() => loadSummary()}>
          <RefreshCw size={16} />
          <span>Refresh</span>
        </button>
        <button type="button" className="secondary-button analytics-clear" onClick={handleClear}>
          Clear
        </button>
      </form>

      {status === 'loading' ? <p className="analytics-state">Loading analytics...</p> : null}
      {error ? <p className="analytics-state analytics-state--error">{error}</p> : null}

      {summary ? (
        <>
          <section className="analytics-metrics">
            <MetricCard icon={BarChart3} label="Total page views" value={summary.totalPageviews} />
            <MetricCard icon={Users} label="Unique visitors" value={summary.uniqueVisitors} />
            <MetricCard icon={MonitorSmartphone} label="Today views" value={latestDayCount} />
            <MetricCard icon={Repeat2} label="Returning visitors" value={summary.returningVisitors ?? 0} />
            <MetricCard icon={MousePointerClick} label="Tracked events" value={summary.totalEvents ?? 0} />
            <MetricCard icon={Clock3} label="Total time" value={formatDuration(summary.totalTimeSeconds)} />
          </section>

          <section className="analytics-grid">
            <RankingList title="Event types" items={summary.events} />
            <RankingList title="Event details" items={summary.eventDetails} />
            <RankingList title="Time by page" items={summary.timeByPage} />
            <RankingList title="Top pages" items={summary.topPages} />
            <RankingList title="Devices" items={summary.devices} chartType="donut" />
            <RankingList title="Browsers" items={summary.browsers} chartType="donut" />
            <RankingList title="Operating systems" items={summary.operatingSystems} chartType="donut" />
            <RankingList title="Countries" items={summary.countries} chartType="bar" />
            <RankingList title="Daily views" items={summary.daily?.map((item) => ({ name: item.date, count: item.count }))} chartType="line" />
          </section>

          <section className="analytics-panel analytics-panel--wide">
            <h2>Recent visits</h2>
            <div className="analytics-recent-list">
              {summary.recent?.length ? (
                summary.recent.map((visit) => (
                  <article className="analytics-recent-item" key={`${visit.at}-${visit.path}`}>
                    <strong>{visit.path}</strong>
                    <span>{formatTime(visit.at)}</span>
                    <span>{[visit.device, visit.browser, visit.os, visit.country].filter(Boolean).join(' / ')}</span>
                  </article>
                ))
              ) : (
                <p className="analytics-empty">No visits recorded yet.</p>
              )}
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
}
