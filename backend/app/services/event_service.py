from sqlalchemy.orm import Session

from app.models.security_event import SecurityEvent


class EventService:
    def __init__(self, db: Session):
        self.db = db

    def list_events(self) -> list[SecurityEvent]:
        return (
            self.db.query(SecurityEvent)
            .order_by(SecurityEvent.id.desc())
            .all()
        )

    def get_event(self, event_id: int) -> SecurityEvent | None:
        return (
            self.db.query(SecurityEvent)
            .filter(SecurityEvent.id == event_id)
            .first()
        )