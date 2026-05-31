import re
from app.models.raw_log import RawLog
from app.models.security_event import SecurityEvent


class IngestionService:
    def __init__(self, db):
        self.db = db

    def extract_username(self, message: str) -> str | None:
        match = re.search(r"Failed password for (\S+)", message)
        
        if match:
            return match.group(1)
        
        return None
    
    def extract_source_ip(self, message: str) -> str | None:
        match = re.search(r"from (\d+\.\d+\.\d+\.\d+)", message)
        
        if match:
            return match.group(1)
        
        return None

    def normalize_event_type(self, message: str) -> str:
        message = message.lower()
        
        if "failed password" in message:
            return "authentication_failed"
        
        if "accepted password" in message:
            return "authentication_success"
        
        return "unknown"

    def normalize_severity(self, event_type: str) -> str:
        if event_type == "authentication_failed":
            return "medium"
        
        if event_type == "authentication_success":
            return "low"
        
        return "low"

    def ingest(
        self,
        log_source_id: int,
        asset_id: int | None,
        message: str,
        timestamp,
    ):
        raw_log = RawLog(
            organization_id=1,
            log_source_id=log_source_id,
            raw_payload=message,
            ingestion_method="manual",
        )

        self.db.add(raw_log)
        self.db.commit()
        self.db.refresh(raw_log)

        event_type = self.normalize_event_type(message)

        severity = self.normalize_severity(event_type)
        
        username = self.extract_username(message)
        
        source_ip = self.extract_source_ip(message)

        security_event = SecurityEvent(
            organization_id=1,
            raw_log_id=raw_log.id,
            log_source_id=log_source_id,
            asset_id=asset_id,
            event_type=event_type,
            event_category=(
                "authentication"
                if event_type.startswith("authentication")
                else "general"
            ),
            severity=severity,
            message=message,
            occurred_at=timestamp,
            source_ip=source_ip,
            username=username,
        )

        self.db.add(security_event)
        self.db.commit()
        self.db.refresh(security_event)

        return {
            "raw_log_id": raw_log.id,
            "security_event_id": security_event.id,
            "event_type": event_type,
            "severity": severity,
        }