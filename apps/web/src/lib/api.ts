import type { AgentSummary, AlertRule, OverviewResponse, RuntimeMeta, WorkflowRun } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  getOverview: () => request<OverviewResponse>("/api/overview"),
  getWorkflows: () => request<WorkflowRun[]>("/api/workflows"),
  getAgents: () => request<AgentSummary[]>("/api/agents"),
  getAlerts: () => request<AlertRule[]>("/api/alerts"),
  getMeta: () => request<RuntimeMeta>("/api/meta")
};
