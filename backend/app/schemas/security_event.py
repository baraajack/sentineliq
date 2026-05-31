from datetime import datetime

from pydantic import BaseModel


class SecurityEventRead(BaseModel):
    id: int
    organization_id: int
    raw_log_id: int
    log_source_id: int
    asset_id: int | None
    event_type: str
    event_category: str
    severity: str
    source_ip: str | None
    destination_port: int | None
    destination_ip: str | None
    username: str | None
    message: str
    occurred_at: datetime
    created_at: datetime

    model_config = {
        "from_attributes": True,
    }