import type { AppConfig } from "./config.js";
import { MockObservabilityRepository, type ObservabilityRepository } from "./repository.js";

export class SigNozObservabilityRepository implements ObservabilityRepository {
  constructor(private readonly config: AppConfig) {}

  async getOverview() {
    return this.mockFallback().getOverview();
  }

  async getWorkflows() {
    return this.mockFallback().getWorkflows();
  }

  async getAgents() {
    return this.mockFallback().getAgents();
  }

  async getAlerts() {
    return this.mockFallback().getAlerts();
  }

  private mockFallback() {
    return new MockObservabilityRepository();
  }
}
