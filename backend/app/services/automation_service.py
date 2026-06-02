from sqlalchemy.orm import Session

from app.services.notification_service import NotificationService


class AutomationService:
    def __init__(self, db: Session):
        self.db = db
        self.notification_service = NotificationService(db)

    def emit_event(
        self,
        organization_id: int,
        event_type: str,
        entity_id: int | None,
        payload: dict,
    ):
        return self.notification_service.send_event(
            organization_id=organization_id,
            event_type=event_type,
            entity_id=entity_id,
            payload=payload,
        )

    def incident_created(
        self,
        incident,
    ):
        return self.emit_event(
            organization_id=incident.organization_id,
            event_type="incident.created",
            entity_id=incident.id,
            payload={
                "event_type": "incident.created",
                "incident": {
                    "id": incident.id,
                    "title": incident.title,
                    "severity": incident.severity,
                    "status": incident.status,
                },
            },
        )