# AGENTS.md

## Scope

These instructions apply to the entire repository. More specific `AGENTS.md` files override them within their directories.

## Repository overview

This is a single-package full-stack TypeScript application:

- `src/`: React 18 frontend built with Vite, Apollo Client, React Router, React Bootstrap, and styled-components.
- `api/`: Express + Apollo Server backend using Mongoose and MongoDB.
- `src/**/*.graphql`: client GraphQL operations and fragments.
- `src/generated/graphql.tsx`: generated GraphQL types and React Apollo hooks.
- `.github/workflows/main.yml`: CI for build, lint, TypeScript compilation, tests, and coverage.

The frontend runs on port `3000`; the backend GraphQL endpoint runs on port `4000` in the example environment.

## Working principles

- Make the smallest coherent change that satisfies the task.
- Preserve existing architecture unless the task explicitly calls for a refactor.
- Prefer explicit, typed code over broad abstractions introduced for one use case.
- Do not edit generated files manually.
- Do not commit secrets or a real `.env`; update `.env.example` when adding configuration.
- Keep user-facing behaviour, GraphQL contracts, authorization checks, and persistence changes consistent across layers.
- Avoid unrelated formatting or dependency updates.

## Repository conventions

- Use TypeScript strict mode and `import type` for type-only imports.
- Use the `@/` alias for imports from `src/`; backend code uses relative imports.
- Follow Prettier settings: no semicolons, single quotes, 2-space indentation, trailing commas, 80-character print width.
- Keep React components and their tests close together when the existing feature follows that pattern.
- Treat ISO date-time strings as the current cross-layer event representation unless a task deliberately migrates the contract.
- Public events are visible to everyone; private events are visible only to their creator. Do not weaken this invariant.
- Mutations affecting a user or event must verify that the authenticated user owns the affected resource.

## GraphQL change workflow

When changing the GraphQL API:

1. Update `api/graphql/schema/index.ts` and the matching resolver implementation.
2. Update affected frontend `.graphql` operations or fragments.
3. Start the backend with the required environment variables.
4. Run `yarn codegen`.
5. Commit the regenerated `src/generated/graphql.tsx` and `graphql.schema.json` when they change.
6. Update tests for both successful and rejected paths.

Never hand-edit `src/generated/graphql.tsx` or `graphql.schema.json`.

## Validation

Install dependencies with `yarn` and use the repository scripts:

- `yarn build` — TypeScript check plus Vite production build.
- `yarn lint` — ESLint and Prettier validation.
- `yarn test --runInBand` — Jest test suite in a deterministic single process.
- `yarn test:coverage` — coverage run when the change materially affects tested behaviour.
- `yarn codegen` — required after GraphQL schema or operation changes.

Run the narrowest relevant test while iterating, then run `yarn build`, `yarn lint`, and the relevant Jest suite before completion. If a command cannot run because MongoDB, environment variables, or another service is unavailable, report that explicitly.

## Testing expectations

- Add or update tests for observable behaviour, not implementation details.
- Prefer Testing Library queries by role, label, or visible text.
- Use Apollo `MockedProvider` for isolated frontend GraphQL tests.
- Do not add skipped tests (`xit`, `xdescribe`, `.skip`) as evidence of completion.
- Cover authorization and ownership failures for protected backend changes.
- Keep mocks minimal and aligned with generated GraphQL documents.

## Dependency and configuration changes

- Use Yarn and keep `yarn.lock` synchronized with `package.json`.
- Do not introduce `package-lock.json`.
- Reuse existing libraries unless a new dependency has a clear, documented benefit.
- When adding an environment variable, update `.env.example` and document its purpose.
- Preserve the CI contract unless the task specifically concerns CI.

## Completion checklist

Before finishing:

- Verify no generated file was manually edited.
- Verify schema, operations, generated types, and resolvers agree.
- Verify protected operations enforce authentication and ownership server-side.
- Verify private-event visibility remains correct.
- Run and report applicable validation commands.
- Summarize changed files, behavioural impact, and any remaining risks.