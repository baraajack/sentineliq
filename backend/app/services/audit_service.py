from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog


def write_audit_log(
    db: Session,
    organization_id: int,
    action: str,
    entity_type: str,
    entity_id: int | None = None,
    user_id: int | None = None,
    metadata_json: dict | None = None,
):
    audit_log = AuditLog(
        organization_id=organization_id,
        user_id=user_id,
        action=action,
        entity_type=entity_type,
        entity_id=entity_id,
        metadata_json=metadata_json,
    )

    db.add(audit_log)
    db.commit()
    db.refresh(audit_log)

    return audit_log