# Development Workflow

## Local Development Loop

1. Pull latest changes.
2. Run `corepack enable` once per machine/session if needed.
3. Run `pnpm install` if dependencies changed.
4. Run `pnpm run dev` for client + server watchers.
5. Make incremental changes.
6. Before commit, run:
   - `pnpm run lint`
   - `pnpm run tsc`
   - `pnpm run build`

## Database Workflow

- Modify `database/schema.sql` for schema changes.
- Optionally add/update sample data in `database/data.sql`.
- Rebuild local DB state with:

```sh
pnpm run db:import
```

## CI Workflow

PRs trigger `/.github/workflows/ci.yml`:

1. Install dependencies (`pnpm install --frozen-lockfile`)
2. Lint (`pnpm run lint`)
3. Typecheck (`pnpm run tsc`)
4. Build (`pnpm run build`)

This catches most integration issues before merge.

## Deployment Workflow

- Deployment is branch-driven through pushes to `pub`.
- Root deploy script:

```sh
pnpm run deploy
```

This pushes `main` to `pub`, triggering `/.github/workflows/main.yml`.

## Recommended Branching

- Create short-lived feature branches from `main`.
- Keep PRs focused on one area (UI/API/data/docs).
- Require CI to pass before merge.
- Update docs in `/docs` when behavior, scripts, or architecture change.
