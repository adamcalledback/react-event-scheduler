# Backend GraphQL AGENTS.md

## Scope

Applies to `api/graphql/`.

## Contract ownership

- `schema/index.ts` is the authoritative GraphQL schema.
- `resolvers/index.ts` composes resolver groups.
- `resolvers/auth.ts`, `events.ts`, and `users.ts` implement the corresponding operations.
- Resolver argument and return types are imported from `src/generated/graphql.tsx`; schema changes therefore require regeneration before the backend type-check can be considered complete.

## Schema changes

- Prefer queries for reads and mutations for state changes. Preserve existing operation names unless a breaking change is intentional.
- Keep nullability deliberate. Do not make fields non-null unless every resolver path can guarantee a value.
- Reuse fragments and generated types rather than duplicating frontend interfaces.
- Coordinate changes with `src/**/*.graphql`, `src/generated/graphql.tsx`, and `graphql.schema.json`.
- Avoid silently changing date formats, pagination semantics, authorization behaviour, or error contracts.

## Resolver rules

- Keep resolvers thin enough to make authorization, filtering, and persistence behaviour understandable.
- Validate authentication before protected database work.
- Verify ownership for user-specific reads and all protected writes.
- Do not trust IDs such as user IDs supplied by the client when the authenticated context already identifies the caller.
- Keep filtering logic consistent between returned records and `totalCount`; apply the same effective filters to both.
- Ensure private data cannot be retrieved through alternate operations such as direct-by-ID lookups or shared links.
- Return stable, user-safe GraphQL errors. Do not expose database internals or secret configuration.
- When adding multi-record fetching, consider DataLoader or batching before introducing resolver-level N+1 queries.

## Required workflow

After changing schema or operations:

1. Update resolver implementation and tests.
2. Update matching frontend `.graphql` documents.
3. Run the backend.
4. Run `yarn codegen` from the repository root.
5. Review generated diffs; do not edit them manually.
6. Run `yarn build`, `yarn lint`, and relevant tests.

For authorization-sensitive changes, test at least unauthenticated access, authenticated ownership, and authenticated non-ownership.