from datetime import datetime
from typing import Any

from pydantic import BaseModel


class DetectionRuleBase(BaseModel):
    name: str
    description: str
    rule_key: str
    rule_type: str
    severity: str
    risk_score: int
    enabled: bool = True
    conditions: dict[str, Any] = {}
    aggregation_window_minutes: int
    threshold: int


class DetectionRuleCreate(DetectionRuleBase):
    organization_id: int = 1


class DetectionRuleUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    severity: str | None = None
    risk_score: int | None = None
    enabled: bool | None = None
    conditions: dict[str, Any] | None = None
    aggregation_window_minutes: int | None = None
    threshold: int | None = None


class DetectionRuleRead(DetectionRuleBase):
    id: int
    organization_id: int
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True,
    }