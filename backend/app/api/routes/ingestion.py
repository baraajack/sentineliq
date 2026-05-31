from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.schemas.ingestion import (
    LogIngestionRequest,
    LogIngestionResponse,
)
from app.services.ingestion_service import IngestionService


router = APIRouter(
    prefix="/api/ingest",
    tags=["ingestion"],
)


@router.post(
    "/log",
    response_model=LogIngestionResponse,
)
def ingest_log(
    payload: LogIngestionRequest,
    db: Session = Depends(get_db),
):
    return IngestionService(db).ingest(
        log_source_id=payload.log_source_id,
        asset_id=payload.asset_id,
        message=payload.message,
        timestamp=payload.timestamp,
    )