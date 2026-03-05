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
