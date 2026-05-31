from datetime import datetime

from pydantic import BaseModel


class AssetBase(BaseModel):
    hostname: str
    ip_address: str
    asset_type: str
    operating_system: str
    environment: str
    criticality: str
    owner: str


class AssetCreate(AssetBase):
    organization_id: int


class AssetUpdate(BaseModel):
    hostname: str | None = None
    ip_address: str | None = None
    asset_type: str | None = None
    operating_system: str | None = None
    environment: str | None = None
    criticality: str | None = None
    owner: str | None = None


class AssetRead(AssetBase):
    id: int
    organization_id: int
    created_at: datetime

    model_config = {
        "from_attributes": True,
    }