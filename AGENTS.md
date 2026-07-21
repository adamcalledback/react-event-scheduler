# Repository Guidelines

## Project Structure

`src/` contains the Vite/React client: page features live in `src/pages/`, reusable UI in `src/components/`, client GraphQL operations in `src/graphql/`, and generated GraphQL types in `src/generated/graphql.tsx`. Shared hooks, utilities, assets, and context providers remain in their respective `src/` folders.

`api/` is the TypeScript Express/Apollo server. Keep GraphQL schema and resolvers under `api/graphql/`, Mongoose models under `api/models/`, and authentication/validation code in `api/middleware/` and `api/utils/`. Tests are colocated as `__tests__/*.test.ts(x)` or as nearby `*.test.tsx` files.

## Development, Build, and Checks

Use Yarn (the repository tracks `yarn.lock`). Copy `.env.example` to `.env` and ensure MongoDB is running before starting the app.

- `yarn start` — runs the API and Vite client together.
- `yarn start:server` / `yarn start:web` — run either service independently.
- `yarn build` — type-checks and produces the production client build.
- `yarn test` — runs the Jest suite; `yarn test:coverage` adds coverage output.
- `yarn lint` / `yarn lint:fix` — check or automatically fix ESLint issues.
- `yarn format` — apply Prettier to source and configuration files.
- `yarn codegen` — regenerate `src/generated/graphql.tsx` and `graphql.schema.json`; start the API first.

## Coding Style and GraphQL Changes

Write TypeScript and follow Prettier’s repository configuration (two-space indentation, single quotes, no semicolons). Use PascalCase for React components and component files (`EventBody.tsx`), camelCase for functions and hooks (`useDebounce.tsx`), and descriptive test names ending in `.test.ts` or `.test.tsx`.

When changing the API schema, update relevant documents in `src/graphql/*.graphql`, run `yarn codegen`, and commit the regenerated artifacts. Do not hand-edit generated files.

## Testing Guidelines

Use Jest with Testing Library for client behavior and Jest for API resolvers, middleware, and utilities. Add focused tests alongside the changed code, covering normal behavior and meaningful failures. Run `yarn test` and `yarn lint` before opening a pull request; use `yarn build` for changes that affect types or production compilation.

## Commits and Pull Requests

Recent commits use short, imperative subjects such as `Set overflow for modal to auto` or `Fixed all failing tests`; dependency updates use `Bump <package> ...`. Keep each commit focused. Pull requests should explain the user-visible or API impact, link the relevant issue when available, list verification commands, and include screenshots for visual changes. Never commit `.env` credentials.
