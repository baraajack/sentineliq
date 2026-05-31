from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class RawLog(Base):
    __tablename__ = "raw_logs"

    id: Mapped[int] = mapped_column(primary_key=True)

    organization_id: Mapped[int] = mapped_column(
        ForeignKey("organizations.id")
    )

    log_source_id: Mapped[int] = mapped_column(
        ForeignKey("log_sources.id")
    )

    raw_payload: Mapped[str] = mapped_column(Text)

    ingestion_method: Mapped[str] = mapped_column(Text)

    received_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )