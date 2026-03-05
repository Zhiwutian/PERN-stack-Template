# Project Structure

## Root

- `package.json`
  - Orchestrates cross-project scripts (`dev`, `lint`, `tsc`, `build`).
- `pnpm-workspace.yaml`
  - Declares workspace packages (`client`, `server`).
- `pnpm-lock.yaml`
  - Locks all workspace dependency versions for reproducible installs.
- `.devcontainer/`
  - Defines reproducible development container setup.
- `.github/workflows/`
  - CI and deployment automation.
- `database/`
  - SQL schema, seed data, and import script.
- `docs/`
  - Project documentation and architecture notes.

## Frontend (`client`)

- `src/`
  - React application source.
  - Recommended growth pattern:
    - `components/` for reusable UI pieces
    - `pages/` for route-level screens
    - `features/` for domain-driven UI + state + API hooks
    - `lib/` for utilities and shared client services
- `vite.config.ts`
  - Vite config and API proxy for local development.
- `package.json`
  - Frontend runtime and build-time dependencies.

## Backend (`server`)

- `server.ts`
  - Express app setup, middleware wiring, route registration, and static hosting.
  - As complexity grows, keep this file thin by delegating routes/services.
- `lib/`
  - Shared backend utilities and middleware (errors, auth, request typing).
- `public/`
  - Server-hosted static files (uploads or other direct-served assets).
- Recommended growth pattern:
  - `routes/` for endpoint modules
  - `services/` for business logic
  - `db/` for SQL access helpers and query modules

## Data Layer (`database`)

- `schema.sql` - canonical schema definition
- `data.sql` - optional seed content
- `import.sh` - deterministic database rebuild/import script

## Ownership Guidance

- UI changes: start in `client/src`.
- API changes: add route + service in `server`.
- DB changes: update `database/schema.sql` and corresponding server queries.
- Cross-cutting behavior changes: update docs in this folder in the same PR.
