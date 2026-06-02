from datetime import datetime, timedelta

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.alert import Alert
from app.models.asset import Asset
from app.models.incident import Incident
from app.models.security_event import SecurityEvent


class SOCSummaryService:
    def __init__(self, db: Session):
        self.db = db

    def generate_24h_summary(self):
        since = datetime.utcnow() - timedelta(hours=24)

        events_processed = (
            self.db.query(SecurityEvent)
            .filter(SecurityEvent.created_at >= since)
            .count()
        )

        alerts_generated = (
            self.db.query(Alert)
            .filter(Alert.created_at >= since)
            .count()
        )

        incidents_opened = (
            self.db.query(Incident)
            .filter(Incident.created_at >= since)
            .count()
        )

        incidents_resolved = (
            self.db.query(Incident)
            .filter(Incident.resolved_at.isnot(None))
            .filter(Incident.resolved_at >= since)
            .count()
        )

        top_source_ips = (
            self.db.query(
                SecurityEvent.source_ip,
                func.count(SecurityEvent.id).label("count"),
            )
            .filter(SecurityEvent.created_at >= since)
            .filter(SecurityEvent.source_ip.isnot(None))
            .group_by(SecurityEvent.source_ip)
            .order_by(func.count(SecurityEvent.id).desc())
            .limit(5)
            .all()
        )

        top_assets = (
            self.db.query(
                Asset.hostname,
                func.count(SecurityEvent.id).label("count"),
            )
            .join(SecurityEvent, SecurityEvent.asset_id == Asset.id)
            .filter(SecurityEvent.created_at >= since)
            .group_by(Asset.hostname)
            .order_by(func.count(SecurityEvent.id).desc())
            .limit(5)
            .all()
        )

        return {
            "period": "last_24_hours",
            "generated_at": datetime.utcnow(),
            "metrics": {
                "events_processed": events_processed,
                "alerts_generated": alerts_generated,
                "incidents_opened": incidents_opened,
                "incidents_resolved": incidents_resolved,
            },
            "top_source_ips": [
                {
                    "source_ip": source_ip,
                    "count": count,
                }
                for source_ip, count in top_source_ips
            ],
            "top_assets": [
                {
                    "hostname": hostname,
                    "count": count,
                }
                for hostname, count in top_assets
            ],
        }