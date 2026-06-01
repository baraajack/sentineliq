from datetime import datetime

from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class IncidentAlert(Base):
    __tablename__ = "incident_alerts"

    incident_id: Mapped[int] = mapped_column(
        ForeignKey("incidents.id"),
        primary_key=True,
    )

    alert_id: Mapped[int] = mapped_column(
        ForeignKey("alerts.id"),
        primary_key=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )