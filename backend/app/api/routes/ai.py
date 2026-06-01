from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.services.ai_service import AIService
from app.services.context_builder_service import ContextBuilderService

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