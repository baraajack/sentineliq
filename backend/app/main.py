from app.api.routes.alerts import router as alerts_router
from fastapi import FastAPI
from app.api.routes.assets import router as assets_router
from app.api.routes.log_sources import (
    router as log_sources_router,
)
from app.api.routes.ingestion import router as ingestion_router
from app.api.routes.events import router as events_router
from app.api.routes.detection_rules import (
    router as detection_rules_router,
)
from app.api.routes.incidents import (
    router as incidents_router,
)

from app.api.routes.ai import router as ai_router

app = FastAPI(
    title="SentinelIQ API",
    version="0.1.0",
)

app.include_router(ai_router)

app.include_router(log_sources_router)
app.include_router(alerts_router)
app.include_router(assets_router)
app.include_router(incidents_router)

app.include_router(ingestion_router)
app.include_router(events_router)
app.include_router(detection_rules_router)

@app.get("/health")
def health_check():
    return {
        "status": "ok",
    }


@app.get("/api/meta")
def meta():
    return {
        "name": "SentinelIQ",
        "version": "0.1.0",
        "environment": "development",
    }