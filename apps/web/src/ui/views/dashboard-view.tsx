import { useQuery } from "@tanstack/react-query";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { api } from "../../lib/api";
import { formatCurrencyUsd } from "../../lib/format";

export function DashboardView() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["overview"],
    queryFn: api.getOverview
  });

  if (isLoading) {
    return <section className="panel"><p>Loading overview...</p></section>;
  }

  if (error || !data) {
    return <section className="panel"><p>Overview unavailable.</p></section>;
  }

  const metrics = [
    { label: "Workflow runs", value: data.metrics.totalRuns24h.toLocaleString() },
    { label: "Failure rate", value: `${data.metrics.failureRatePct}%` },
    { label: "Budget used", value: `${data.metrics.budgetUsedPct}%` },
    { label: "Avg latency", value: `${data.metrics.avgLatencyMs} ms` }
  ];

  const latestTrend = data.trend[data.trend.length - 1];

  return (
    <section className="stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>Operations at a glance</h2>
        </div>
        <div className={`status-badge ${data.systemStatus}`}>
          {data.systemStatus}
        </div>
      </header>
      <div className="metric-grid">
        {metrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <p>{metric.label}</p>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </div>
      <article className="panel chart-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Trend</p>
            <h3>Throughput and spend</h3>
          </div>
          <p>{data.metrics.recentAlerts} recent alerts</p>
        </div>
        {latestTrend ? (
          <div className="trend-summary">
            <span>Latest interval: {latestTrend.runs} runs</span>
            <span>{latestTrend.failures} failures</span>
            <span>{formatCurrencyUsd(latestTrend.costUsd)} spend</span>
          </div>
        ) : null}
        <div className="chart-shell">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.trend}>
              <defs>
                <linearGradient id="cost" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#ff7a18" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#ff7a18" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#243447" />
              <XAxis dataKey="timestamp" stroke="#9ab0c7" />
              <YAxis stroke="#9ab0c7" />
              <Tooltip />
              <Area dataKey="costUsd" stroke="#ff7a18" fill="url(#cost)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  );
}
