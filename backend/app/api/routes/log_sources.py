from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.schemas.log_source import (
    LogSourceCreate,
    LogSourceRead,
    LogSourceUpdate,
)
from app.services.log_source_service import LogSourceService


router = APIRouter(
    prefix="/api/log-sources",
    tags=["log-sources"],
)


@router.get("", response_model=list[LogSourceRead])
def list_log_sources(
    db: Session = Depends(get_db),
):
    return LogSourceService(db).list_log_sources()


@router.post(
    "",
    response_model=LogSourceRead,
    status_code=status.HTTP_201_CREATED,
)
def create_log_source(
    payload: LogSourceCreate,
    db: Session = Depends(get_db),
):
    return LogSourceService(db).create_log_source(payload)


@router.get("/{log_source_id}", response_model=LogSourceRead)
def get_log_source(
    log_source_id: int,
    db: Session = Depends(get_db),
):
    log_source = (
        LogSourceService(db)
        .get_log_source(log_source_id)
    )

    if log_source is None:
        raise HTTPException(
            status_code=404,
            detail="Log source not found",
        )

    return log_source


@router.patch("/{log_source_id}", response_model=LogSourceRead)
def update_log_source(
    log_source_id: int,
    payload: LogSourceUpdate,
    db: Session = Depends(get_db),
):
    log_source = (
        LogSourceService(db)
        .update_log_source(log_source_id, payload)
    )

    if log_source is None:
        raise HTTPException(
            status_code=404,
            detail="Log source not found",
        )

    return log_source


@router.delete(
    "/{log_source_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_log_source(
    log_source_id: int,
    db: Session = Depends(get_db),
):
    deleted = (
        LogSourceService(db)
        .delete_log_source(log_source_id)
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Log source not found",
        )