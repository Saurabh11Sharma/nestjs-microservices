# NestJS Microservices Workspace

A NestJS 10 / TypeScript workspace organised into separate applications with shared libraries. It demonstrates a hybrid HTTP/TCP authentication service, a reservation API that communicates with the auth service, and a small TCP payments message handler.

## Workspace architecture

| Application / library | Current implementation |
|---|---|
| apps/auth | HTTP login endpoint using Passport local strategy; JWT strategy; TCP message pattern named authenticate; MongoDB / Mongoose user module |
| apps/reservations | HTTP reservation CRUD endpoints; guarded create route; MongoDB persistence; TCP client connection to the auth service |
| apps/payments | TCP microservice with a payments.ping message handler; this is a transport / application scaffold, not a payment-processing implementation |
| libs/common | Shared database, logging, auth, constants, decorators and DTO modules |
| docker-compose.yaml | Local MongoDB plus auth, reservations and payments application containers |

The service areas have different levels of business implementation. In particular, the payments application is currently a small TCP handler scaffold; do not present it as a complete payment gateway.

## Technology

- NestJS 10 and TypeScript
- MongoDB / Mongoose
- Passport local and JWT strategies
- NestJS TCP transport
- Joi environment validation
- Pino-based logging
- Docker and Docker Compose
- Jest and Supertest dependencies

## Local development

Requirements: Node.js, npm and Docker Desktop.

1. Install dependencies from the repository root:

       npm install

2. Create the service environment files from the committed examples:

       copy apps\auth\.env.example apps\auth\.env
       copy apps\reservations\.env.example apps\reservations\.env
       copy apps\payments\.env.example apps\payments\.env

   On macOS / Linux, use cp instead of copy.

3. Review the JWT secret in apps/auth/.env and replace the sample value with a long random local secret. Do not commit app .env files.

4. Validate the Compose configuration and start the workspace:

       docker compose config
       docker compose up --build

The Compose file starts MongoDB and then the service containers. Auth exposes HTTP on port 3001 and its TCP transport on port 3002 inside the Compose network; reservations exposes HTTP on port 3000; payments listens on TCP port 3003.

## Key environment variables

### Auth — apps/auth/.env

- MONGODB_URI
- JWT_SECRET
- JWT_EXPIRATION
- AUTH_HTTP_PORT
- AUTH_TCP_PORT

### Reservations — apps/reservations/.env

- MONGODB_URI
- RESERVATION_HTTP_PORT
- AUTH_HOST
- AUTH_PORT

### Payments — apps/payments/.env

- PAYMENTS_PORT

Safe local examples are in the corresponding .env.example files.

## Build and test

    npm run build
    npm test
    npm run test:e2e

## Engineering considerations

- Keep each service's configuration and secrets outside source control.
- Define explicit API and message contracts between services.
- Make message handlers idempotent before introducing automatic retries.
- Add health checks, graceful shutdown and structured logs.
- Add integration tests around service boundaries.
- Document data ownership and failure / retry behaviour.
- Extend the payments scaffold with explicit domain behaviour, validation and persistence before calling it a payment service implementation.

## Roadmap

- Add contract and end-to-end tests across service boundaries.
- Define messaging semantics, retries, dead-letter handling and idempotency.
- Add robust request validation and object-level authorisation to reservation update / delete routes.
- Add CI for lint, type-check, tests and builds.
- Complete the payment domain use cases and documentation.

## Contact

Saurabh Sharma · https://github.com/Saurabh11Sharma
