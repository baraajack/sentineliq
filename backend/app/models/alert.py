from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Alert(Base):
    __tablename__ = "alerts"

    id: Mapped[int] = mapped_column(primary_key=True)

    organization_id: Mapped[int] = mapped_column(
        ForeignKey("organizations.id")
    )

    detection_rule_id: Mapped[int] = mapped_column(
        ForeignKey("detection_rules.id")
    )

    asset_id: Mapped[int | None] = mapped_column(
        ForeignKey("assets.id"),
        nullable=True,
    )

    title: Mapped[str] = mapped_column(Text)
    description: Mapped[str] = mapped_column(Text)

    severity: Mapped[str] = mapped_column(String(50))
    risk_score: Mapped[int] = mapped_column(Integer)

    status: Mapped[str] = mapped_column(String(50), default="open")

    source_ip: Mapped[str | None] = mapped_column(Text, nullable=True)
    username: Mapped[str | None] = mapped_column(Text, nullable=True)

    event_count: Mapped[int] = mapped_column(Integer, default=1)

    first_seen_at: Mapped[datetime] = mapped_column(DateTime)
    last_seen_at: Mapped[datetime] = mapped_column(DateTime)

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )