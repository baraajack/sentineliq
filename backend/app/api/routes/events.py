from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.schemas.security_event import SecurityEventRead
from app.services.event_service import EventService


router = APIRouter(
    prefix="/api/events",
    tags=["events"],
)


@router.get("", response_model=list[SecurityEventRead])
def list_events(db: Session = Depends(get_db)):
    return EventService(db).list_events()


@router.get("/{event_id}", response_model=SecurityEventRead)
def get_event(
    event_id: int,
    db: Session = Depends(get_db),
):
    event = EventService(db).get_event(event_id)

    if event is None:
        raise HTTPException(
            status_code=404,
            detail="Security event not found",
        )

    return event