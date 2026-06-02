from datetime import datetime

from pydantic import BaseModel


class WebhookBase(BaseModel):
    name: str
    target_url: str
    event_type: str
    enabled: bool = True


class WebhookCreate(WebhookBase):
    organization_id: int = 1


class WebhookUpdate(BaseModel):
    name: str | None = None
    target_url: str | None = None
    event_type: str | None = None
    enabled: bool | None = None


class WebhookRead(WebhookBase):
    id: int
    organization_id: int
    created_at: datetime

    model_config = {
        "from_attributes": True,
    }