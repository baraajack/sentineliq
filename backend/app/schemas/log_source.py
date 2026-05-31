from datetime import datetime

from pydantic import BaseModel


class LogSourceBase(BaseModel):
    name: str
    source_type: str
    parser_type: str
    is_active: bool = True


class LogSourceCreate(LogSourceBase):
    organization_id: int


class LogSourceUpdate(BaseModel):
    name: str | None = None
    source_type: str | None = None
    parser_type: str | None = None
    is_active: bool | None = None


class LogSourceRead(LogSourceBase):
    id: int
    organization_id: int
    created_at: datetime

    model_config = {
        "from_attributes": True,
    }