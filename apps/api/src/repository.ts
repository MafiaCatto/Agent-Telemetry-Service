import type { AgentSummary, AlertRule, OverviewResponse, WorkflowRun } from "./domain.js";

export interface ObservabilityRepository {
  getOverview(): Promise<OverviewResponse>;
  getWorkflows(): Promise<WorkflowRun[]>;
  getAgents(): Promise<AgentSummary[]>;
  getAlerts(): Promise<AlertRule[]>;
}

export class MockObservabilityRepository implements ObservabilityRepository {
  async getOverview(): Promise<OverviewResponse> {
    return {
      metrics: {
        totalRuns24h: 1842,
        failureRatePct: 2.8,
        budgetUsedPct: 63,
        avgLatencyMs: 913,
        recentAlerts: 4
      },
      trend: [
        { timestamp: "2026-04-25T18:00:00Z", runs: 211, failures: 3, costUsd: 14.8 },
        { timestamp: "2026-04-25T21:00:00Z", runs: 244, failures: 8, costUsd: 18.1 },
        { timestamp: "2026-04-26T00:00:00Z", runs: 176, failures: 4, costUsd: 12.2 },
        { timestamp: "2026-04-26T03:00:00Z", runs: 158, failures: 5, costUsd: 11.4 },
        { timestamp: "2026-04-26T06:00:00Z", runs: 202, failures: 6, costUsd: 15.9 },
        { timestamp: "2026-04-26T09:00:00Z", runs: 239, failures: 7, costUsd: 19.7 }
      ],
      systemStatus: "healthy"
    };
  }

  async getWorkflows(): Promise<WorkflowRun[]> {
    return [
      {
        id: "wf_10428",
        workflowName: "customer-support-triage",
        status: "success",
        startedAt: "2026-04-26T13:18:00Z",
        durationMs: 1288,
        totalTokens: 4221,
        estimatedCostUsd: 0.084,
        environment: "prod",
        traceId: "4f43e307ce7a4a01"
      },
      {
        id: "wf_10427",
        workflowName: "fraud-review-copilot",
        status: "failed",
        startedAt: "2026-04-26T13:16:00Z",
        durationMs: 2081,
        totalTokens: 5662,
        estimatedCostUsd: 0.121,
        environment: "prod",
        traceId: "16ccd4abc00ff219"
      },
      {
        id: "wf_10426",
        workflowName: "sales-research-brief",
        status: "running",
        startedAt: "2026-04-26T13:12:00Z",
        durationMs: 4521,
        totalTokens: 9114,
        estimatedCostUsd: 0.196,
        environment: "staging",
        traceId: "5a082dbf33cd9d17"
      }
    ];
  }

  async getAgents(): Promise<AgentSummary[]> {
    return [
      {
        id: "agent_triage",
        name: "Triage Agent",
        toolCallsTotal: 912,
        toolCallsFailed: 12,
        avgLatencyMs: 643,
        errorRatePct: 1.3,
        status: "healthy"
      },
      {
        id: "agent_research",
        name: "Research Agent",
        toolCallsTotal: 631,
        toolCallsFailed: 41,
        avgLatencyMs: 1287,
        errorRatePct: 6.5,
        status: "warning"
      },
      {
        id: "agent_router",
        name: "Workflow Router",
        toolCallsTotal: 1884,
        toolCallsFailed: 9,
        avgLatencyMs: 214,
        errorRatePct: 0.4,
        status: "healthy"
      }
    ];
  }

  async getAlerts(): Promise<AlertRule[]> {
    return [
      {
        id: "alert_01",
        name: "Daily budget burn",
        metric: "estimated_cost_usd",
        operator: "gte",
        threshold: 250,
        severity: "warning",
        active: true,
        notifyChannels: ["slack://ops-observability", "email://platform-alerts@example.com"],
        lastTriggeredAt: "2026-04-26T10:04:00Z"
      },
      {
        id: "alert_02",
        name: "Workflow failures",
        metric: "failure_rate_pct",
        operator: "gt",
        threshold: 5,
        severity: "critical",
        active: true,
        notifyChannels: ["slack://incident-response"],
        lastTriggeredAt: null
      }
    ];
  }
}
