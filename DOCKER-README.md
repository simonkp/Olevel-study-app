# Docker (Local Development)

This project uses PostgreSQL for Prisma. For local development, run the database with Docker Compose.
The dev setup also includes pgAdmin.

## Files

- `compose.yaml`: base service definition
- `compose.dev.yaml`: local development overrides (ports, dev credentials, pgAdmin)
- `docker/pgadmin/servers.json`: preconfigured pgAdmin connection to the `db` container

## Start Database

From the project root:

```bash
docker compose -f compose.yaml -f compose.dev.yaml up -d
```

This starts:

- PostgreSQL at `localhost:5432`
- pgAdmin at `http://localhost:5050`

Check status:

```bash
docker compose -f compose.yaml -f compose.dev.yaml ps
```

View logs:

```bash
docker compose -f compose.yaml -f compose.dev.yaml logs -f db
```

```bash
docker compose -f compose.yaml -f compose.dev.yaml logs -f pgadmin
```

## pgAdmin Login

- Email: `admin@local.dev`
- Password: `admin`

The server connection is preloaded from `docker/pgadmin/servers.json`, so you do not need to configure the connection manually in the pgAdmin UI.
If you change DB credentials, update both `compose.dev.yaml` and `docker/pgadmin/servers.json`.

## Stop Database

```bash
docker compose -f compose.yaml -f compose.dev.yaml down
```

## Reset Database (Delete Local Data)

```bash
docker compose -f compose.yaml -f compose.dev.yaml down -v
```

## Environment Variables

Use this in `.env` (already aligned with `.env.example`):

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/study_platform?schema=public"
```

## Prisma Setup After DB Starts

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```