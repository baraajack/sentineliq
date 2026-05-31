from datetime import datetime

from pydantic import BaseModel


class LogIngestionRequest(BaseModel):
    log_source_id: int
    asset_id: int | None = None
    message: str
    timestamp: datetime


class LogIngestionResponse(BaseModel):
    raw_log_id: int
    security_event_id: int
    event_type: str
    severity: str
    alerts_created: int
    alerts_updated: int