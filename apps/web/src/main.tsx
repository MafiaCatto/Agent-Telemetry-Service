import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import "./styles.css";
import { AppShell } from "./ui/app-shell";
import { AlertsView } from "./ui/views/alerts-view";
import { AgentsView } from "./ui/views/agents-view";
import { DashboardView } from "./ui/views/dashboard-view";
import { SettingsView } from "./ui/views/settings-view";
import { WorkflowsView } from "./ui/views/workflows-view";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: AppShell
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DashboardView
});

const workflowsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/workflows",
  component: WorkflowsView
});

const agentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/agents",
  component: AgentsView
});

const alertsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/alerts",
  component: AlertsView
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: SettingsView
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  workflowsRoute,
  agentsRoute,
  alertsRoute,
  settingsRoute
]);

const router = createRouter({
  routeTree
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
