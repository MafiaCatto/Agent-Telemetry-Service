import { buildApp } from "./app.js";

const { app, config } = await buildApp();

try {
  await app.listen({ host: config.API_HOST, port: config.API_PORT });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
