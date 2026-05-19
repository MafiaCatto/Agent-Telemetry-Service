# Agent Observability Platform

A production-oriented starter for a vendor-neutral observability platform for AI agents and workflows. This repository implements the management-facing layer described in the system design:

- a thin API that can query SigNoz directly today
- a React frontend for management dashboards
- infrastructure definitions for local development and self-hosted deployment
- room to add a transform service later without reworking the core app

## Monorepo Layout

- `apps/api` - Fastify API for management-facing endpoints
- `apps/web` - React + Vite frontend
- `infra` - Docker Compose, OpenTelemetry Collector config, env examples

## Product Direction

This starter intentionally treats SigNoz as the engineering source of truth and keeps the management schema optional. The current API serves mocked management projections behind stable contracts so we can iterate on frontend and backend behavior before wiring real SigNoz queries.

## Architecture Snapshot

- OpenTelemetry Collector acts as the vendor-neutral ingest point
- SigNoz remains the engineering-facing backend for traces and raw telemetry
- The API shapes management-facing data contracts for the frontend
- The React app focuses on KPIs, workflow status, and alert visibility rather than replacing trace exploration

## Getting Started

1. Copy `infra/.env.example` to `.env` and adjust values.
2. Install dependencies with `npm install`.
3. Start the API with `npm run dev --workspace @agent-observability/api`.
4. Start the frontend with `npm run dev --workspace @agent-observability/web`.
5. Point the web app at the API with `VITE_API_BASE_URL=http://localhost:4000` if you are not using the default.

## Useful Commands

- `npm run typecheck --workspace @agent-observability/api`
- `npm run typecheck --workspace @agent-observability/web`
- `npm run build --workspace @agent-observability/api`
- `npm run build --workspace @agent-observability/web`

## Current Status

- Management UI routes are live for dashboard, workflows, agents, alerts, and settings
- API endpoints currently serve stable mock data contracts plus runtime metadata
- CI validates typecheck and build for both apps on every push

## Initial API Surface

- `GET /health/live`
- `GET /health/ready`
- `GET /api/overview`
- `GET /api/workflows`
- `GET /api/agents`
- `GET /api/alerts`

## Next Steps

- Replace mocked repository adapters with SigNoz-backed query services
- Add authn/authz and multitenant org scoping
- Introduce a transform service only if management reporting truly requires its own rollups
- Add deployment manifests for Kubernetes once the runtime contract settles
