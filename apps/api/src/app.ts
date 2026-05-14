import cors from "@fastify/cors";
import Fastify from "fastify";
import { loadConfig } from "./config.js";
import { MockObservabilityRepository } from "./repository.js";
import { registerRoutes } from "./routes.js";
import { SigNozObservabilityRepository } from "./signoz-repository.js";

export async function buildApp() {
  const config = loadConfig();
  const app = Fastify({
    logger: {
      transport: config.NODE_ENV === "development"
        ? { target: "pino-pretty", options: { translateTime: "SYS:standard" } }
        : undefined
    }
  });

  await app.register(cors, {
    origin: config.CORS_ORIGIN
  });

  const repository = config.DATA_SOURCE === "signoz"
    ? new SigNozObservabilityRepository(config)
    : new MockObservabilityRepository();
  await registerRoutes(app, repository, config);

  return { app, config };
}
