from sqlalchemy.orm import Session

from app.models.alert import Alert
from app.models.incident import Incident
from app.models.incident_alert import IncidentAlert


def build_incident_timeline(db: Session, incident_id: int):
    incident = db.query(Incident).filter(Incident.id == incident_id).first()

    if incident is None:
        return None

    timeline = [
        {
            "type": "incident_created",
            "title": "Incident created",
            "description": incident.title,
            "timestamp": incident.created_at,
        }
    ]

    linked_alerts = (
        db.query(Alert)
        .join(IncidentAlert, IncidentAlert.alert_id == Alert.id)
        .filter(IncidentAlert.incident_id == incident.id)
        .all()
    )

    for alert in linked_alerts:
        timeline.append(
            {
                "type": "alert_linked",
                "title": "Alert linked to incident",
                "description": alert.title,
                "timestamp": alert.created_at,
            }
        )

    return sorted(timeline, key=lambda item: item["timestamp"])