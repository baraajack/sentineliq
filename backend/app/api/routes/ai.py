from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.services.ai_service import AIService
from app.services.context_builder_service import ContextBuilderService

from app.models.ai_report import AIReport
from app.services.audit_service import write_audit_log

router = APIRouter(prefix="/api/ai", tags=["ai"])


@router.post("/alerts/{alert_id}/explain")
def explain_alert(
    alert_id: int,
    db: Session = Depends(get_db),
):
    context = (
        ContextBuilderService(db)
        .build_alert_context(alert_id)
    )

    if context is None:
        raise HTTPException(
            status_code=404,
            detail="Alert not found",
        )
    result = AIService().explain_alert(context)
    
    write_audit_log(
        db=db,
        organization_id=context["alert"].get("organization_id", 1),
        action="ai_alert_explained",
        entity_type="alert",
        entity_id=alert_id,
        metadata_json={
            "model_name": "local-placeholder",
        },
    )

    return result

    

@router.post("/incidents/{incident_id}/summarize")
def summarize_incident(
    incident_id: int,
    db: Session = Depends(get_db),
):
    context = (
        ContextBuilderService(db)
        .build_incident_context(incident_id)
    )

    if context is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )
    result = AIService().summarize_incident(context)
    
    write_audit_log(
        db=db,
        organization_id=1,
        action="ai_incident_summarized",
        entity_type="incident",
        entity_id=incident_id,
        metadata_json={
            "model_name": "local-placeholder",
        },
    )

    return result

    

@router.post("/incidents/{incident_id}/report")
def generate_incident_report(
    incident_id: int,
    db: Session = Depends(get_db),
):
    context = ContextBuilderService(db).build_incident_context(incident_id)

    if context is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    content = AIService().generate_incident_report(context)

    report = AIReport(
        organization_id=1,
        incident_id=incident_id,
        report_type="incident_report",
        generated_by_user_id=None,
        content=content,
        model_name="local-placeholder",
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    write_audit_log(
        db=db,
        organization_id=report.organization_id,
        action="ai_report_generated",
        entity_type="incident",
        entity_id=incident_id,
        metadata_json={
            "report_id": report.id,
            "model_name": report.model_name,
        },
    )

    return {
        "id": report.id,
        "organization_id": report.organization_id,
        "incident_id": report.incident_id,
        "report_type": report.report_type,
        "generated_by_user_id": report.generated_by_user_id,
        "content": report.content,
        "model_name": report.model_name,
        "created_at": report.created_at,
    }