from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Alert(Base):
    __tablename__ = "alerts"

    id: Mapped[int] = mapped_column(primary_key=True)

    organization_id: Mapped[int] = mapped_column(
        ForeignKey("organizations.id")
    )

    asset_id: Mapped[int | None] = mapped_column(
        ForeignKey("assets.id"),
        nullable=True,
    )

    title: Mapped[str] = mapped_column(Text)

    description: Mapped[str] = mapped_column(Text)

    severity: Mapped[str] = mapped_column(Text)

    status: Mapped[str] = mapped_column(Text)

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )