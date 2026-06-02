from sqlalchemy.orm import Session

from app.services.notification_service import NotificationService
from app.models.incident import Incident
from app.models.incident_alert import IncidentAlert

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
    def auto_create_incident_for_alert(self, alert):
        if alert.severity not in ["high", "critical"]:
            return None

        existing_link = (
            self.db.query(IncidentAlert)
            .filter(IncidentAlert.alert_id == alert.id)
            .first()
        )

        if existing_link is not None:
            return None

        incident = Incident(
            organization_id=alert.organization_id,
            title=alert.title,
            description=alert.description,
            severity=alert.severity,
            status="open",
            assigned_to_user_id=None,
            created_from_alert_id=alert.id,
        )

        self.db.add(incident)
        self.db.commit()
        self.db.refresh(incident)

        link = IncidentAlert(
            incident_id=incident.id,
            alert_id=alert.id,
        )

        self.db.add(link)
        self.db.commit()

        self.incident_created(incident)

        return incident