from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from sqlalchemy import DateTime, ForeignKey, Integer, Text

class SecurityEvent(Base):
    __tablename__ = "security_events"

    id: Mapped[int] = mapped_column(primary_key=True)

    organization_id: Mapped[int] = mapped_column(
        ForeignKey("organizations.id")
    )

    raw_log_id: Mapped[int] = mapped_column(
        ForeignKey("raw_logs.id")
    )

    log_source_id: Mapped[int] = mapped_column(
        ForeignKey("log_sources.id")
    )

    asset_id: Mapped[int | None] = mapped_column(
        ForeignKey("assets.id"),
        nullable=True,
    )

    event_type: Mapped[str] = mapped_column(Text)
    event_category: Mapped[str] = mapped_column(Text)

    severity: Mapped[str] = mapped_column(Text)

    source_ip: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    destination_ip: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    destination_port: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    username: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    message: Mapped[str] = mapped_column(Text)

    occurred_at: Mapped[datetime] = mapped_column(DateTime)

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )