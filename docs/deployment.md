# Deployment Guide

## Overview

SentinelIQ supports:

* Local development deployment
* Production-style Docker deployment

---

## Development Deployment

Start services:

```bash
docker compose up -d
```

Run database migrations:

```bash
docker compose exec backend alembic upgrade head
```

Verify health:

```bash
curl http://localhost:8000/health
```

Expected:

```json
{"status":"ok"}
```

---

## Development URLs

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:8000
```

API Documentation:

```text
http://localhost:8000/docs
```

---

## Production-style Deployment

Build images:

```bash
docker compose -f docker-compose.prod.yml build
```

Start services:

```bash
docker compose -f docker-compose.prod.yml up -d
```

Check running containers:

```bash
docker ps
```

Verify backend:

```bash
curl http://localhost:8000/health
```

---

## Environment Variables

Backend:

```text
ENVIRONMENT
LOG_LEVEL

POSTGRES_HOST
POSTGRES_PORT
POSTGRES_DB
POSTGRES_USER
POSTGRES_PASSWORD

REDIS_HOST
REDIS_PORT

JWT_SECRET_KEY
OPENAI_API_KEY
WEBHOOK_SIGNING_SECRET
```

Frontend:

```text
NEXT_PUBLIC_API_BASE_URL
```

---

## Database Migrations

Create migration:

```bash
docker compose exec backend alembic revision --autogenerate -m "message"
```

Apply migrations:

```bash
docker compose exec backend alembic upgrade head
```

Current migration status:

```bash
docker compose exec backend alembic current
```

---

## CI/CD

GitHub Actions automatically validates:

* Backend package build
* Backend tests
* Frontend production build
* Docker Compose configuration
* Production image builds

Workflow location:

```text
.github/workflows/ci.yml
```

---

## Troubleshooting

### Backend not starting

Check logs:

```bash
docker compose logs backend
```

### Database migration failure

Check current revision:

```bash
docker compose exec backend alembic current
```

### Frontend build failure

Run:

```bash
cd frontend
npm run build
```

to identify TypeScript or Next.js issues before deployment.
