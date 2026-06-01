from datetime import datetime

from pydantic import BaseModel


class AnalystNoteCreate(BaseModel):
    note: str
    user_id: int | None = None


class AnalystNoteRead(BaseModel):
    id: int
    organization_id: int
    incident_id: int
    user_id: int | None
    note: str
    created_at: datetime

    model_config = {
        "from_attributes": True,
    }