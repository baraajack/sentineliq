# Security Documentation

## Overview

SentinelIQ is a cybersecurity platform, so the system itself must follow security-aware design principles.

This document summarizes the current security posture and planned hardening work.

---

## Configuration and Secrets

SentinelIQ uses environment variables for runtime configuration.

Sensitive values should be provided through:

* Local `.env` files
* Docker Compose environment variables
* GitHub Actions secrets
* Cloud provider secret managers

The project must never commit:

```text
.env
API keys
JWT secrets
Production database credentials
Webhook signing secrets
```

The committed `.env.example` file contains placeholders only.

---

## Input Validation

FastAPI request bodies use Pydantic schemas.

This provides:

* Type validation
* Required field validation
* Structured request parsing

Important API areas using schemas include:

* Log ingestion
* Alerts
* Incidents
* Analyst notes
* Webhooks

---

## Auditability

SentinelIQ records audit-relevant activity.

Current audit coverage includes:

* AI alert explanation
* AI incident summarization
* AI report generation
* Webhook delivery attempts

Automation delivery attempts are recorded in:

```text
webhook_deliveries
```

AI audit records are stored in:

```text
audit_logs
```

---

## Webhook Security

Webhook integration is supported through configured destinations.

Current controls:

* Webhooks can be enabled or disabled
* Delivery attempts are logged
* Failed deliveries preserve error details
* Webhook URLs are stored as configuration

Planned improvements:

* Webhook signing
* Replay protection
* Retry limits
* Delivery backoff
* Destination allowlisting

---

## Container Security

Production containers include:

* Non-root users
* Docker ignore files
* Production-specific compose file
* Health checks

Planned improvements:

* Image vulnerability scanning
* Minimal runtime images
* Explicit resource limits

---

## Authentication and Authorization

The project includes a user model with password hash storage.

Planned improvements:

* JWT authentication enforcement
* Role-based access control
* Admin, Analyst, Viewer roles
* Route-level authorization checks
* Token expiration and refresh strategy

---

## Rate Limiting

Planned rate limits:

```text
POST /api/ingest/log
POST /api/auth/login
Webhook creation endpoints
AI generation endpoints
```

Redis can be used as the backing store for distributed rate limiting.

---

## Known Gaps

The following items are planned for future hardening:

* Full authentication flow
* RBAC enforcement
* Rate limiting
* Webhook request signing
* Structured security logs
* Prompt injection defenses for future real LLM integration
* Test database for integration tests
* Production deployment secrets management

---

## Security Posture Summary

SentinelIQ currently demonstrates strong security engineering foundations:

* Validation
* Audit logging
* Secrets hygiene
* Container hardening
* Webhook delivery tracking
* Environment-based configuration

Further work should focus on access control, rate limiting, and production monitoring.
