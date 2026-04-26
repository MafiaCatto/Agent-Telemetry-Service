export function SettingsView() {
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
