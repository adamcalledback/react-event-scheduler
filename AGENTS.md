# AGENTS.md

## Project overview

This repository contains a React/Vite frontend and a Node.js/Express + Apollo GraphQL backend for the Event Scheduler application.

- Frontend code lives in `src/`.
- Backend code lives in `api/`.
- GraphQL operations and generated frontend types are managed through the repository's GraphQL Code Generator configuration.
- MongoDB is required for local backend development.

## Development commands

Use the package-manager scripts defined in `package.json`:

- `yarn start` — run frontend and backend together.
- `yarn start:web` — run the Vite frontend only.
- `yarn start:server` — run the GraphQL backend only.
- `yarn build` — type-check and build the frontend.
- `yarn test` — run Jest tests.
- `yarn test:coverage` — run tests with coverage.
- `yarn lint` — run ESLint.
- `yarn format` — format supported source and documentation files.

## Change guidelines

- Keep changes focused and preserve unrelated working-tree modifications.
- Follow the existing TypeScript, React hooks, styled-components, and Bootstrap patterns.
- Add or update tests for behavior changes where practical.
- Run the narrowest relevant checks, then run `yarn build`, `yarn lint`, and `yarn test` for broader changes.
- Do not commit secrets, local `.env` files, generated credentials, or database data.

