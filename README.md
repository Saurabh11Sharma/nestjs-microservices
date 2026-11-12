# NestJS Microservices Workspace

A NestJS 10 / TypeScript workspace organised into separate service applications and shared code. The repository is useful for exploring service boundaries, authentication patterns, container setup and a multi-application NestJS structure.

## Workspace layout

| Path | Purpose / current scope |
|---|---|
| apps/auth | Authentication application with Passport local and JWT strategies, JWT configuration and user module integration |
| apps/payments | Payments application module and controller/service scaffolding |
| apps/reservations | Reservations application within the workspace |
| libs/common | Shared library area; currently includes common logging support |
| docker-compose.yaml | Local multi-container development orchestration |
| apps/*/Dockerfile | Per-application container build definitions |

The workspace has service-level scaffolding and implementation of varying depth. Review each application before assuming that every business workflow is complete or production-ready.

## Technology visible in the repository

- NestJS and TypeScript
- MongoDB / Mongoose integration in the auth application
- Passport local and JWT strategies
- NestJS microservices package
- Pino-based logging dependencies
- Docker and Docker Compose
- Jest and Supertest dependencies

## Local development

Requirements: Node.js, npm and Docker Desktop.

Install dependencies from the repository root:

    npm install

The auth application validates these environment variables at startup:

- MONGODB_URI
- JWT_SECRET
- JWT_EXPIRATION
- AUTH_HTTP_PORT
- AUTH_TCP_PORT

Create the required app-level environment files locally (for example, apps/auth/.env). Do not commit real secrets. Other applications may have additional configuration requirements; inspect their ConfigModule setup before starting the full workspace.

Build the workspace:

    npm run build

Run tests:

    npm test
    npm run test:e2e

The Docker Compose file references app-level .env files. Create those files before running:

    docker compose config
    docker compose up --build

## Engineering considerations

- Keep each service's configuration and secrets outside source control.
- Define explicit API and message contracts between services.
- Make message handlers idempotent before enabling automatic retries.
- Add health checks, graceful shutdown and structured logs.
- Add integration tests around service boundaries.
- Document data ownership and failure / retry behaviour.
- Keep the workspace a modular learning project until deployment, security and reliability concerns are addressed.

## Roadmap

- Complete and document each service's business use cases.
- Add reproducible local dependencies and safe environment templates.
- Add contract and end-to-end tests across service boundaries.
- Define messaging semantics, retries, dead-letter handling and idempotency.
- Add CI for lint, type-check, tests and builds.

## Contact

Saurabh Sharma · https://github.com/Saurabh11Sharma
