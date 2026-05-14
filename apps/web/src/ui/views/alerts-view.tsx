import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { formatTimestamp } from "../../lib/format";

export function AlertsView() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["alerts"],
    queryFn: api.getAlerts
  });

  if (isLoading) {
    return <section className="panel"><p>Loading alert rules...</p></section>;
  }

  if (error || !data) {
    return <section className="panel"><p>Alert rules unavailable.</p></section>;
  }

  return (
    <section className="stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Alerts</p>
          <h2>Notification rules</h2>
        </div>
      </header>
      <div className="stack">
        {data.map((alert) => (
          <article key={alert.id} className="panel alert-card">
            <div className="panel-header">
              <div>
                <h3>{alert.name}</h3>
                <p>{alert.metric} {alert.operator} {alert.threshold}</p>
              </div>
              <span className={`pill ${alert.severity}`}>{alert.severity}</span>
            </div>
            <p>{alert.active ? "Active" : "Paused"}</p>
            <p>Channels: {alert.notifyChannels.join(", ")}</p>
            <p>Last triggered: {formatTimestamp(alert.lastTriggeredAt)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
