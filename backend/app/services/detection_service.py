from app.models.detection_rule import DetectionRule
from app.models.security_event import SecurityEvent
from app.services.alert_service import AlertService


class DetectionService:
    def __init__(self, db):
        self.db = db
        self.alert_service = AlertService(db)

    def evaluate_event(self, event: SecurityEvent) -> dict[str, int]:
        alerts_created = 0
        alerts_updated = 0

        rules = (
            self.db.query(DetectionRule)
            .filter(DetectionRule.organization_id == event.organization_id)
            .filter(DetectionRule.enabled.is_(True))
            .all()
        )

        for rule in rules:
            if rule.rule_key == "suspicious_ip_match":
                created = self.evaluate_suspicious_ip(event, rule)

                if created is True:
                    alerts_created += 1
                elif created is False:
                    alerts_updated += 1

        return {
            "alerts_created": alerts_created,
            "alerts_updated": alerts_updated,
        }

    def evaluate_suspicious_ip(
        self,
        event: SecurityEvent,
        rule: DetectionRule,
    ) -> bool | None:
        ip_list = rule.conditions.get("ip_list", [])

        if event.source_ip not in ip_list:
            return None

        _, was_created = self.alert_service.create_or_update_alert(
            event=event,
            rule=rule,
            title="Suspicious source IP detected",
            description=f"Event originated from suspicious IP {event.source_ip}",
            severity=rule.severity,
            risk_score=rule.risk_score,
        )

        return was_created