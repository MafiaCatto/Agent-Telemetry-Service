import { Link, Outlet, useRouterState } from "@tanstack/react-router";

const navItems: Array<{ to: string; label: string }> = [
  { to: "/", label: "Dashboard" },
  { to: "/workflows", label: "Workflows" },
  { to: "/agents", label: "Agents" },
  { to: "/alerts", label: "Alerts" },
  { to: "/settings", label: "Settings" }
];

export function AppShell() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname
  });

  return (
    <div className="layout">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Management View</p>
          <h1>Agent Observability</h1>
          <p className="sidebar-copy">
            A calm surface for workflow health, agent reliability, and budget drift.
          </p>
        </div>
        <nav className="nav">
          {navItems.map((item) => (
            <Link
              key={item.to}
              className={pathname === item.to ? "nav-button active" : "nav-button"}
              to={item.to}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
