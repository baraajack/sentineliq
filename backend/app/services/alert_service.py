from datetime import datetime

from sqlalchemy.orm import Session

from app.models.alert import Alert
from app.models.detection_rule import DetectionRule
from app.models.security_event import SecurityEvent


ACTIVE_ALERT_STATUSES = [
    "open",
    "triaged",
    "investigating",
]


class AlertService:
    def __init__(self, db: Session):
        self.db = db

    def find_existing_alert(
        self,
        event: SecurityEvent,
        rule: DetectionRule,
    ) -> Alert | None:
        return (
            self.db.query(Alert)
            .filter(Alert.organization_id == event.organization_id)
            .filter(Alert.detection_rule_id == rule.id)
            .filter(Alert.asset_id == event.asset_id)
            .filter(Alert.source_ip == event.source_ip)
            .filter(Alert.username == event.username)
            .filter(Alert.status.in_(ACTIVE_ALERT_STATUSES))
            .first()
        )

    def create_or_update_alert(
        self,
        event: SecurityEvent,
        rule: DetectionRule,
        title: str,
        description: str,
        severity: str,
        risk_score: int,
    ) -> tuple[Alert, bool]:
        existing_alert = self.find_existing_alert(event, rule)

        if existing_alert:
            existing_alert.event_count += 1
            existing_alert.last_seen_at = event.occurred_at

            if risk_score > existing_alert.risk_score:
                existing_alert.risk_score = risk_score

            self.db.commit()
            self.db.refresh(existing_alert)

            return existing_alert, False

        now = datetime.utcnow()

        alert = Alert(
            organization_id=event.organization_id,
            detection_rule_id=rule.id,
            asset_id=event.asset_id,
            title=title,
            description=description,
            severity=severity,
            risk_score=risk_score,
            status="open",
            source_ip=event.source_ip,
            username=event.username,
            event_count=1,
            first_seen_at=event.occurred_at or now,
            last_seen_at=event.occurred_at or now,
        )

        self.db.add(alert)
        self.db.commit()
        self.db.refresh(alert)

        return alert, True