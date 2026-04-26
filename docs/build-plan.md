# Build Plan

## What Exists Now

- Management API contracts for overview, workflows, agents, and alerts
- React management UI with dashboard, workflows, agents, alerts, and settings routes
- OpenTelemetry Collector config for a local vendor-neutral ingest point
- Docker Compose starter for local development

## What Makes This Production-Ready Next

1. Replace mock repositories with SigNoz-backed query adapters.
2. Add authentication, organization scoping, and audit logging.
3. Add a real alert-rule persistence layer before allowing writes from the UI.
4. Add CI checks for typecheck, lint, and build.
5. Introduce a transform service only if management reporting requires durable rollups outside SigNoz.

## Integration Notes

- The API intentionally exposes management-shaped DTOs so the frontend is decoupled from SigNoz response formats.
- `DATA_SOURCE=signoz` is reserved for the live adapter; keep mock mode for local frontend work and contract tests.
- Deep links to SigNoz traces should be generated from workflow trace IDs once SigNoz base URLs are finalized.
