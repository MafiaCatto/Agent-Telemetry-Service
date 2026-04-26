import type { FastifyInstance } from "fastify";
import type { ObservabilityRepository } from "./repository.js";

export async function registerRoutes(app: FastifyInstance, repository: ObservabilityRepository) {
  app.get("/health/live", async () => ({ status: "ok" }));

  app.get("/health/ready", async () => ({
    status: "ready",
    dependencies: {
      api: "up",
      signoz: "pending"
    }
  }));

  app.get("/api/overview", async () => repository.getOverview());
  app.get("/api/workflows", async () => repository.getWorkflows());
  app.get("/api/agents", async () => repository.getAgents());
  app.get("/api/alerts", async () => repository.getAlerts());
}
