from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.services.ai_service import AIService
from app.services.context_builder_service import ContextBuilderService

from app.models.ai_report import AIReport

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

    return AIService().explain_alert(context)

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

    return AIService().summarize_incident(context)

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

    return report