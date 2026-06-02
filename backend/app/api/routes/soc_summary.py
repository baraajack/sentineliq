from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.services.soc_summary_service import SOCSummaryService


router = APIRouter(prefix="/api/soc-summary", tags=["soc-summary"])


@router.get("/daily")
def get_daily_soc_summary(db: Session = Depends(get_db)):
    return SOCSummaryService(db).generate_24h_summary()