from sqlalchemy.orm import Session

from app.models.asset import Asset
from app.schemas.asset import AssetCreate, AssetUpdate


class AssetService:
    def __init__(self, db: Session):
        self.db = db

    def list_assets(self) -> list[Asset]:
        return self.db.query(Asset).order_by(Asset.id).all()

    def get_asset(self, asset_id: int) -> Asset | None:
        return self.db.query(Asset).filter(Asset.id == asset_id).first()

    def create_asset(self, data: AssetCreate) -> Asset:
        asset = Asset(**data.model_dump())
        self.db.add(asset)
        self.db.commit()
        self.db.refresh(asset)
        return asset

    def update_asset(self, asset_id: int, data: AssetUpdate) -> Asset | None:
        asset = self.get_asset(asset_id)
        if asset is None:
            return None

        update_data = data.model_dump(exclude_unset=True)

        for field, value in update_data.items():
            setattr(asset, field, value)

        self.db.commit()
        self.db.refresh(asset)
        return asset

    def delete_asset(self, asset_id: int) -> bool:
        asset = self.get_asset(asset_id)
        if asset is None:
            return False

        self.db.delete(asset)
        self.db.commit()
        return True