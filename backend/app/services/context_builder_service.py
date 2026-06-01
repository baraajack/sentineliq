from sqlalchemy.orm import Session

from app.models.alert import Alert
from app.models.incident import Incident
from app.models.incident_alert import IncidentAlert
from app.models.analyst_note import AnalystNote
from app.models.asset import Asset


class ContextBuilderService:
    def __init__(self, db: Session):
        self.db = db

    def build_alert_context(
        self,
        alert_id: int,
    ):
        alert = (
            self.db.query(Alert)
            .filter(Alert.id == alert_id)
            .first()
        )

        if alert is None:
            return None

        asset = None

        if alert.asset_id:
            asset = (
                self.db.query(Asset)
                .filter(Asset.id == alert.asset_id)
                .first()
            )

        return {
            "alert": {
                "id": alert.id,
                "title": alert.title,
                "description": alert.description,
                "severity": alert.severity,
                "risk_score": alert.risk_score,
                "status": alert.status,
                "source_ip": alert.source_ip,
                "username": alert.username,
                "event_count": alert.event_count,
            },
            "asset": (
                {
                    "hostname": asset.hostname,
                    "ip_address": asset.ip_address,
                    "asset_type": asset.asset_type,
                    "criticality": asset.criticality,
                }
                if asset
                else None
            ),
        }

    def build_incident_context(
        self,
        incident_id: int,
    ):
        incident = (
            self.db.query(Incident)
            .filter(Incident.id == incident_id)
            .first()
        )

        if incident is None:
            return None

        alerts = (
            self.db.query(Alert)
            .join(
                IncidentAlert,
                IncidentAlert.alert_id == Alert.id,
            )
            .filter(
                IncidentAlert.incident_id == incident.id
            )
            .all()
        )

        notes = (
            self.db.query(AnalystNote)
            .filter(
                AnalystNote.incident_id == incident.id
            )
            .all()
        )

        return {
            "incident": {
                "id": incident.id,
                "title": incident.title,
                "description": incident.description,
                "severity": incident.severity,
                "status": incident.status,
            },
            "alerts": [
                {
                    "id": alert.id,
                    "title": alert.title,
                    "severity": alert.severity,
                    "risk_score": alert.risk_score,
                    "source_ip": alert.source_ip,
                }
                for alert in alerts
            ],
            "notes": [
                {
                    "id": note.id,
                    "note": note.note,
                    "created_at": note.created_at.isoformat(),
                }
                for note in notes
            ],
        }