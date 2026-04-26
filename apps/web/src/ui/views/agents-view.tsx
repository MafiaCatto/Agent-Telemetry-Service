import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";

export function AgentsView() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["agents"],
    queryFn: api.getAgents
  });

  if (isLoading) {
    return <section className="panel"><p>Loading agent stats...</p></section>;
  }

  if (error || !data) {
    return <section className="panel"><p>Agent stats unavailable.</p></section>;
  }

  return (
    <section className="stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Agents</p>
          <h2>Reliability by agent</h2>
        </div>
      </header>
      <div className="metric-grid">
        {data.map((agent) => (
          <article key={agent.id} className="metric-card">
            <div className="panel-header">
              <h3>{agent.name}</h3>
              <span className={`status-badge ${agent.status}`}>{agent.status}</span>
            </div>
            <p>{agent.toolCallsTotal.toLocaleString()} tool calls</p>
            <p>{agent.toolCallsFailed} failed</p>
            <p>{agent.avgLatencyMs} ms average latency</p>
            <p>{agent.errorRatePct}% error rate</p>
          </article>
        ))}
      </div>
    </section>
  );
}
