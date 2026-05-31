from sqlalchemy.orm import Session

from app.models.log_source import LogSource
from app.schemas.log_source import (
    LogSourceCreate,
    LogSourceUpdate,
)


class LogSourceService:
    def __init__(self, db: Session):
        self.db = db

    def list_log_sources(self):
        return (
            self.db.query(LogSource)
            .order_by(LogSource.id)
            .all()
        )

    def get_log_source(self, log_source_id: int):
        return (
            self.db.query(LogSource)
            .filter(LogSource.id == log_source_id)
            .first()
        )

    def create_log_source(self, data: LogSourceCreate):
        log_source = LogSource(**data.model_dump())

        self.db.add(log_source)
        self.db.commit()
        self.db.refresh(log_source)

        return log_source

    def update_log_source(
        self,
        log_source_id: int,
        data: LogSourceUpdate,
    ):
        log_source = self.get_log_source(log_source_id)

        if log_source is None:
            return None

        for field, value in (
            data.model_dump(exclude_unset=True).items()
        ):
            setattr(log_source, field, value)

        self.db.commit()
        self.db.refresh(log_source)

        return log_source

    def delete_log_source(self, log_source_id: int):
        log_source = self.get_log_source(log_source_id)

        if log_source is None:
            return False

        self.db.delete(log_source)
        self.db.commit()

        return True