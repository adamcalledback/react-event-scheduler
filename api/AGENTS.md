# Backend AGENTS.md

## Scope

Applies to all files under `api/`. The GraphQL-specific instructions in `api/graphql/AGENTS.md` take precedence within that directory.

## Architecture

- `index.ts` owns process startup, Express middleware, Apollo integration, static frontend serving, MongoDB connection, and HTTP listening.
- `graphql/schema/` defines the public API contract.
- `graphql/resolvers/` implements authentication, event, and user operations.
- `models/` contains Mongoose schemas and models.
- `middleware/auth.ts` builds the GraphQL request context from the `auth` cookie and verifies the JWT.
- `interfaces/types.ts` contains backend domain and context types.
- `utils/` contains reusable validation and backend helpers.

Keep transport setup, authorization, domain behaviour, and persistence concerns separated according to these existing boundaries.

## Backend rules

- Enforce authentication and ownership in resolvers; frontend checks are never sufficient.
- For protected operations, derive the acting user from verified context, not from arbitrary client input.
- Never return password hashes or JWT secrets.
- Use generic authentication errors where detailed errors would reveal account existence or credentials.
- Preserve the private-event rule: unauthenticated users see only public events; authenticated users see public events plus their own private events.
- Scope updates and deletes by both resource ID and authenticated owner ID.
- Validate required environment variables before using them and fail with a clear error.
- Avoid loading environment configuration in multiple leaf modules when modifying startup architecture; prefer central startup configuration for new code.

## Mongoose and data changes

- Keep Mongoose model fields aligned with GraphQL types and backend interfaces.
- Consider indexes when adding fields used for filtering, sorting, uniqueness, or ownership checks.
- Do not rely on a preliminary lookup alone for authorization; keep ownership constraints in the update or delete query itself.
- Use atomic Mongoose operations where practical.
- Preserve timestamps unless the operation intentionally requires otherwise.
- When changing event date handling, update all comparisons, filters, sorting, frontend input handling, and tests together.

## Server changes

- Keep `/graphql` middleware ordering compatible with cookies, JSON parsing, CORS credentials, and Apollo context creation.
- Do not place the SPA catch-all route before API routes. If changing route setup, ensure `/graphql` cannot be intercepted by static frontend serving.
- Keep graceful startup failures visible; do not swallow MongoDB or HTTP startup errors.
- Never log tokens, cookies, passwords, or secret values.

## Validation

For backend-only changes, run:

- `yarn build`
- `yarn lint`
- Relevant Jest tests

For GraphQL contract changes, also follow `api/graphql/AGENTS.md` and run `yarn codegen` with the backend available.