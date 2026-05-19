import type { FastifyInstance } from "fastify";
import type { AppConfig } from "./config.js";
import type { ObservabilityRepository } from "./repository.js";

export async function registerRoutes(
  app: FastifyInstance,
  repository: ObservabilityRepository,
  config: AppConfig
) {
  app.get("/", async () => ({
    service: "agent-observability-api",
    status: "ok",
    timestamp: new Date().toISOString()
  }));

  app.get("/health/live", async () => ({ status: "ok" }));

  app.get("/health/ready", async () => ({
    status: "ready",
    dependencies: {
      api: "up",
      signoz: "pending"
    }
  }));

  app.get("/api/meta", async () => ({
    dataSource: config.DATA_SOURCE,
    defaultLookbackHours: config.DEFAULT_LOOKBACK_HOURS,
    signozBaseUrl: config.SIGNOZ_BASE_URL
  }));

  app.get("/api/overview", async () => repository.getOverview());
  app.get("/api/workflows", async () => repository.getWorkflows());
  app.get("/api/agents", async () => repository.getAgents());
  app.get("/api/alerts", async () => repository.getAlerts());
}
