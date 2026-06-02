# SentinelIQ Architecture

## High-Level Architecture

```text
                   ┌─────────────┐
                   │ Log Sources │
                   └──────┬──────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Ingestion Layer │
                 └────────┬────────┘
                          │
                          ▼
                ┌──────────────────┐
                │ Security Events  │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Detection Engine │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │      Alerts      │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │    Incidents     │
                └────────┬─────────┘
                         │
          ┌──────────────┴──────────────┐
          ▼                             ▼
 ┌────────────────┐          ┌────────────────┐
 │  AI Analyst    │          │  Automation    │
 └────────┬───────┘          └──────┬─────────┘
          │                         │
          ▼                         ▼
 ┌────────────────┐        ┌──────────────────┐
 │ Incident Report│        │ Webhooks / n8n   │
 └────────────────┘        └──────────────────┘
```

---

## Backend Architecture

### API Layer

FastAPI routes expose:

* Assets
* Events
* Detection Rules
* Alerts
* Incidents
* AI Operations
* Webhooks
* SOC Summaries

---

### Service Layer

Business logic is implemented inside services.

Key services:

```text
IngestionService
DetectionEngineService
AlertService
IncidentService
AIService
AutomationService
NotificationService
WebhookService
SocSummaryService
```

---

### Persistence Layer

Database access is implemented with:

```text
SQLAlchemy ORM
Alembic migrations
PostgreSQL
```

Core entities:

```text
Organization
User
Asset
LogSource
RawLog
SecurityEvent
DetectionRule
Alert
Incident
IncidentNote
AIAuditLog
Webhook
WebhookDelivery
```

---

## Frontend Architecture

Framework:

```text
Next.js
React
TypeScript
```

Pages:

```text
Dashboard
Assets
Events
Detection Rules
Alerts
Alert Details
Incidents
Incident Details
```

Frontend communicates exclusively through REST APIs.

---

## Automation Flow

```text
Alert Created
      ↓
Automation Service
      ↓
Incident Auto-Creation
      ↓
Notification Service
      ↓
Webhook Delivery
      ↓
n8n Workflow
```

---

## Deployment Architecture

```text
Frontend Container
        │
        ▼
Backend Container
        │
 ┌──────┴──────┐
 ▼             ▼
PostgreSQL   Redis
```

All services can be deployed using:

```bash
docker compose -f docker-compose.prod.yml up -d
```
