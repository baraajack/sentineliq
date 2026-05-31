from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, JSON, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class DetectionRule(Base):
    __tablename__ = "detection_rules"

    id: Mapped[int] = mapped_column(primary_key=True)

    organization_id: Mapped[int] = mapped_column(
        ForeignKey("organizations.id"),
    )

    name: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)

    rule_key: Mapped[str] = mapped_column(String(100), unique=True)
    rule_type: Mapped[str] = mapped_column(String(50))

    severity: Mapped[str] = mapped_column(String(50))
    risk_score: Mapped[int] = mapped_column(Integer)

    enabled: Mapped[bool] = mapped_column(Boolean, default=True)

    conditions: Mapped[dict] = mapped_column(JSON)

    aggregation_window_minutes: Mapped[int] = mapped_column(Integer)
    threshold: Mapped[int] = mapped_column(Integer)

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

