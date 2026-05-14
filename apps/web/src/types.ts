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
  systemStatus: "healthy" | "warning" | "critical";
}

export interface WorkflowRun {
  id: string;
  workflowName: string;
  status: "success" | "failed" | "running";
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
  status: "healthy" | "warning" | "critical";
}

export interface AlertRule {
  id: string;
  name: string;
  metric: string;
  operator: "gt" | "gte" | "lt" | "lte";
  threshold: number;
  severity: "info" | "warning" | "critical";
  active: boolean;
  notifyChannels: string[];
  lastTriggeredAt: string | null;
}

export interface RuntimeMeta {
  dataSource: "mock" | "signoz";
  defaultLookbackHours: number;
}
