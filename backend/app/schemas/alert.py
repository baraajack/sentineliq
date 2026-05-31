from datetime import datetime

from pydantic import BaseModel


class AlertRead(BaseModel):
    id: int
    organization_id: int
    detection_rule_id: int
    asset_id: int | None
    title: str
    description: str
    severity: str
    risk_score: int
    status: str
    source_ip: str | None
    username: str | None
    event_count: int
    first_seen_at: datetime
    last_seen_at: datetime
    created_at: datetime

    model_config = {
        "from_attributes": True,
    }


class AlertStatusUpdate(BaseModel):
    status: str