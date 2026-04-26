export type Status = "healthy" | "warning" | "critical";
export type RunStatus = "success" | "failed" | "running";
export type Severity = "info" | "warning" | "critical";

export interface OverviewMetrics {
  totalRuns24h: number;
  failureRatePct: number;
  budgetUsedPct: number;
  avgLatencyMs: number;
  recentAlerts: number;
}

export interface OverviewTrendPoint {
  timestamp: string;
  runs: number;
  failures: number;
  costUsd: number;
}

export interface OverviewResponse {
  metrics: OverviewMetrics;
  trend: OverviewTrendPoint[];
  systemStatus: Status;
}

export interface WorkflowRun {
  id: string;
  workflowName: string;
  status: RunStatus;
  startedAt: string;
  durationMs: number;
  totalTokens: number;
  estimatedCostUsd: number;
  environment: "prod" | "staging" | "dev";
  traceId: string;
}

export interface AgentSummary {
  id: string;
  name: string;
  toolCallsTotal: number;
  toolCallsFailed: number;
  avgLatencyMs: number;
  errorRatePct: number;
  status: Status;
}

export interface AlertRule {
  id: string;
  name: string;
  metric: string;
  operator: "gt" | "gte" | "lt" | "lte";
  threshold: number;
  severity: Severity;
  active: boolean;
  notifyChannels: string[];
  lastTriggeredAt: string | null;
}
