# Documentation Index

This folder contains maintainable project documentation for application structure, runtime behavior, and team workflow.

## Documents

- `architecture.md`
  - High-level architecture
  - Request lifecycle
  - Data flow and runtime boundaries
- `project-structure.md`
  - Directory ownership and responsibilities
  - Where to add new code as the app grows
- `development-workflow.md`
  - Local setup and daily development loop
  - CI and deployment lifecycle

## Documentation Maintenance Rules

- Update docs in the same pull request as behavior changes.
- Keep this folder implementation-aware (actual paths, real scripts).
- Prefer concise docs that explain "why" and "where", not line-by-line code.
- If a script or workflow changes, update `README.md` and this folder together.

## How To Update The Changelog

`CHANGELOG.md` lives at the project root and should be updated in every PR that changes behavior, architecture, tooling, or workflow.

- Add new entries under `## [Unreleased]` in the correct subsection:
  - `Added`
  - `Changed`
  - `Fixed`
  - `Removed`
- Write concise, user-facing summaries of impact (what changed and why it matters).
- Group related file changes into one bullet when possible.
- When cutting a release, move `Unreleased` entries into a dated/versioned section and reset `Unreleased`.

## Test Changed Script Note

For fast local feedback, run:

```sh
pnpm run test:changed
```

To override the diff base ref used by the script:

```sh
TEST_CHANGED_BASE=origin/main pnpm run test:changed
```
