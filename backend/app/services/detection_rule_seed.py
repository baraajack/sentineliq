from sqlalchemy.orm import Session

from app.models.detection_rule import DetectionRule


def seed_detection_rules(db: Session) -> None:
    existing_rules = db.query(DetectionRule).count()

    if existing_rules > 0:
        return

    rules = [
        DetectionRule(
            organization_id=1,
            name="Multiple Failed Logins",
            description="Detect repeated failed login attempts",
            rule_key="failed_login_threshold",
            rule_type="threshold",
            severity="high",
            risk_score=80,
            enabled=True,
            conditions={},
            aggregation_window_minutes=10,
            threshold=5,
        ),
        DetectionRule(
            organization_id=1,
            name="Port Scan Activity",
            description="Detect multiple destination ports",
            rule_key="port_scan_threshold",
            rule_type="threshold",
            severity="high",
            risk_score=90,
            enabled=True,
            conditions={},
            aggregation_window_minutes=5,
            threshold=10,
        ),
        DetectionRule(
            organization_id=1,
            name="Suspicious Source IP",
            description="Detect events from suspicious IPs",
            rule_key="suspicious_ip_match",
            rule_type="match",
            severity="medium",
            risk_score=70,
            enabled=True,
            conditions={
                "ip_list": [
                    "203.0.113.10",
                    "198.51.100.25",
                    "192.0.2.44",
                ]
            },
            aggregation_window_minutes=0,
            threshold=1,
        ),
    ]

    db.add_all(rules)
    db.commit()