# full-stack-project

A full stack TypeScript template with React, Express, and PostgreSQL.

## Tech Stack

- Node.js 22 (devcontainer-managed)
- pnpm 10 (via Corepack)
- React 19 + Vite 7 (`client`)
- Express 5 + PostgreSQL (`server`)
- TypeScript, ESLint, Prettier, Husky, lint-staged

## Getting Started

### 1) Create your repository

1. Click `Use this template` on GitHub and create your new repository.
2. Name it after your project (not `full-stack-project`).

### 2) Open in Cursor Dev Container (persistent)

1. Clone to your local machine:

   ```sh
   git clone <your-repo-ssh-url>
   cd <your-repo-name>
   ```

2. Open that folder in Cursor.
3. Run `Dev Containers: Rebuild and Reopen in Container`.

This template bind-mounts your local folder to `/workspace`, so files persist across rebuilds.

### 3) Install and configure env

1. Install dependencies:

   ```sh
   corepack enable
   pnpm install
   ```

2. Configure environment:
   - Update `server/.env` with your database name in `DATABASE_URL`.
   - Set `TOKEN_SECRET` in `server/.env`.
   - Mirror non-secret env updates in `server/.env.example`.

### 4) Create your database

```sh
sudo service postgresql start
createdb <name-of-database>
```

Then run:

```sh
pnpm run db:import
```

### 5) Start local development

```sh
pnpm run dev
```

Open the app and confirm the client can hit `/api/hello`.

## Scripts

- `pnpm run dev` - runs both client and server watchers
- `pnpm run lint` - lints client and server
- `pnpm run tsc` - type checks client and server
- `pnpm run build` - builds the client for production
- `pnpm run start` - starts production server
- `pnpm run db:import` - resets/imports schema and seed data
- `pnpm run psql` - opens `psql` using `DATABASE_URL`
- `pnpm run deploy` - pushes `main` to `pub` for deployment workflow

## CI and Deployment

- Pull requests run CI checks in `/.github/workflows/ci.yml`:
  - `docs-policy` (requires docs updates when app/config files change)
  - `lint`
  - `tsc`
  - `build`
- Deployment runs from `/.github/workflows/main.yml` on pushes to `pub`.

## Project Docs

Long-form project documentation is in `/docs`:

- `docs/README.md` - documentation index and maintenance guidance
- `docs/architecture.md` - system architecture and request/data flow
- `docs/project-structure.md` - folder-by-folder ownership and purpose
- `docs/development-workflow.md` - local workflow, CI, and deployment process

## Documentation Quality Gates

Every pull request should meet these documentation gates:

- If behavior changed, update docs in `/docs` in the same PR.
- If scripts/workflows changed, update `README.md` and `docs/development-workflow.md`.
- If architecture boundaries changed, update `docs/architecture.md`.
- If code moved or ownership changed, update `docs/project-structure.md`.
- For major features, add a short design/behavior note using `docs/templates/feature-doc-template.md`.

PR authors should complete the documentation checklist in `/.github/pull_request_template.md`.
