# Frontend AGENTS.md

## Scope

Applies to all files under `src/`. Instructions in `src/generated/AGENTS.md` take precedence for generated output.

## Architecture

- `main.tsx` composes global providers and the browser router.
- `App.tsx` composes Apollo, routes, idle-session behaviour, notifications, and global layout.
- `Routes.tsx` owns route-to-page mapping.
- `pages/` contains route-level features.
- `components/` contains reusable UI and feature components.
- `store/` and `hooks/` own authentication state and reusable React behaviour.
- `apolloClient.ts` owns GraphQL transport and global Apollo error handling.
- Root-level `.graphql` files define operations and fragments used to generate `generated/graphql.tsx`.

## React rules

- Use function components and hooks.
- Keep route-level data orchestration in pages and reusable presentation or interaction logic in components.
- Prefer existing React Bootstrap and styled-components patterns over introducing another styling system.
- Preserve accessible names and semantic controls; prefer real `button`, `label`, form, and heading elements.
- Do not duplicate server state in local state without a clear editing or interaction need.
- Keep loading, empty, success, validation, unauthenticated, and error states explicit.
- Do not use non-null assertions for data that can legitimately be absent at runtime.
- Avoid effects for values that can be derived during render.

## Authentication and routing

- `AuthProvider` is the frontend source of authentication state; cookie persistence is handled by the auth hook.
- Treat frontend authorization as user experience only. Server-side resolvers remain authoritative.
- Preserve Apollo `credentials: 'include'` and backend CORS compatibility when changing transport.
- On authentication expiry, clear local auth consistently and route the user safely.
- Keep route parameter IDs synchronized with authenticated-user ownership checks for account pages.

## GraphQL operations

- Write operations in `.graphql` files and consume generated documents, types, and hooks from `@/generated/graphql`.
- Reuse fragments for repeated field selections.
- Do not construct duplicate handwritten GraphQL result types.
- After changing operations or the server schema, run `yarn codegen` and review all generated changes.
- Keep Apollo mocks keyed to the exact generated document and variables used by the component.

## Testing

- Co-locate tests with the component or feature when following existing structure.
- Test behaviour through Testing Library, using role, label, visible text, and user-event interactions where practical.
- Wrap components with the minimum providers required by the scenario.
- Cover loading, success, error, and authentication-dependent behaviour for changed GraphQL flows.
- Do not add disabled or placeholder tests.

## Validation

For frontend changes, run:

- Relevant Jest tests
- `yarn build`
- `yarn lint`

Also run `yarn codegen` for any `.graphql` or backend schema change.