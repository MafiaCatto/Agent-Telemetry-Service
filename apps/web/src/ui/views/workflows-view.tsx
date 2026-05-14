import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";

export function WorkflowsView() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["workflows"],
    queryFn: api.getWorkflows
  });

  if (isLoading) {
    return <section className="panel"><p>Loading workflow history...</p></section>;
  }

  if (error || !data) {
    return <section className="panel"><p>Workflow history unavailable.</p></section>;
  }

  return (
    <section className="stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Workflows</p>
          <h2>Recent runs</h2>
        </div>
      </header>
      <article className="panel table-panel">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Env</th>
              <th>Started</th>
              <th>Duration</th>
              <th>Tokens</th>
              <th>Cost</th>
              <th>Trace</th>
            </tr>
          </thead>
          <tbody>
            {data.map((run) => (
              <tr key={run.id}>
                <td>{run.workflowName}</td>
                <td><span className={`pill ${run.status}`}>{run.status}</span></td>
                <td><span className="pill">{run.environment}</span></td>
                <td>{new Date(run.startedAt).toLocaleString()}</td>
                <td>{run.durationMs} ms</td>
                <td>{run.totalTokens.toLocaleString()}</td>
                <td>${run.estimatedCostUsd.toFixed(3)}</td>
                <td><code>{run.traceId}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
