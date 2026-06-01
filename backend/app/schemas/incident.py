from datetime import datetime

from pydantic import BaseModel


class IncidentBase(BaseModel):
    title: str
    description: str
    severity: str
    status: str = "open"
    assigned_to_user_id: int | None = None
    created_from_alert_id: int | None = None


class IncidentCreate(IncidentBase):
    organization_id: int = 1


class IncidentUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    severity: str | None = None
    status: str | None = None
    assigned_to_user_id: int | None = None
    resolved_at: datetime | None = None


class IncidentRead(IncidentBase):
    id: int
    organization_id: int
    created_at: datetime
    updated_at: datetime
    resolved_at: datetime | None = None

    model_config = {
        "from_attributes": True,
    }