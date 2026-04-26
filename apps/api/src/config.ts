import { z } from "zod";

const configSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  API_HOST: z.string().default("0.0.0.0"),
  API_PORT: z.coerce.number().int().positive().default(4000),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  DATA_SOURCE: z.enum(["mock", "signoz"]).default("mock"),
  SIGNOZ_BASE_URL: z.string().url().default("http://localhost:3301"),
  SIGNOZ_API_KEY: z.string().default(""),
  DEFAULT_LOOKBACK_HOURS: z.coerce.number().int().positive().default(24)
});

export type AppConfig = z.infer<typeof configSchema>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return configSchema.parse(env);
}
