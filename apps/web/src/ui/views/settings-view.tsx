import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";

export function SettingsView() {
  const { data } = useQuery({
    queryKey: ["meta"],
    queryFn: api.getMeta
  });

  return (
    <section className="stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Settings</p>
          <h2>Environment posture</h2>
        </div>
      </header>
      <article className="panel">
        <div className="panel-header">
          <div>
            <h3>SigNoz connection</h3>
            <p>Primary engineering drill-down remains in SigNoz. This app stays focused on management-facing views.</p>
          </div>
        </div>
        <p>Configure API credentials, default time windows, retention expectations, and deep-link targets here next.</p>
        {data ? (
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Data source</span>
              <strong>{data.dataSource}</strong>
            </div>
            <div className="detail-item">
              <span className="detail-label">Default lookback</span>
              <strong>{data.defaultLookbackHours} hours</strong>
            </div>
            <div className="detail-item">
              <span className="detail-label">SigNoz base URL</span>
              <strong>{data.signozBaseUrl}</strong>
            </div>
          </div>
        ) : null}
      </article>
      <article className="panel">
        <div className="panel-header">
          <div>
            <h3>Transform service</h3>
            <p>Keep this disabled until management reporting requires a separate business-metrics schema.</p>
          </div>
        </div>
      </article>
    </section>
  );
}
