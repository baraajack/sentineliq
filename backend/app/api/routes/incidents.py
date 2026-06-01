from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.schemas.incident import IncidentCreate, IncidentRead, IncidentUpdate
from app.services import incident_service
from app.services.timeline_service import build_incident_timeline

from app.models.analyst_note import AnalystNote
from app.schemas.analyst_note import AnalystNoteCreate, AnalystNoteRead

router = APIRouter(prefix="/api/incidents", tags=["incidents"])


@router.get("", response_model=list[IncidentRead])
def list_incidents(db: Session = Depends(get_db)):
    return incident_service.get_incidents(db)


@router.post("", response_model=IncidentRead, status_code=status.HTTP_201_CREATED)
def create_incident(payload: IncidentCreate, db: Session = Depends(get_db)):
    return incident_service.create_incident(db, payload)


@router.get("/{incident_id}", response_model=IncidentRead)
def get_incident(incident_id: int, db: Session = Depends(get_db)):
    incident = incident_service.get_incident(db, incident_id)

    if incident is None:
        raise HTTPException(status_code=404, detail="Incident not found")

    return incident


@router.patch("/{incident_id}", response_model=IncidentRead)
def update_incident(
    incident_id: int,
    payload: IncidentUpdate,
    db: Session = Depends(get_db),
):
    incident = incident_service.get_incident(db, incident_id)

    if incident is None:
        raise HTTPException(status_code=404, detail="Incident not found")

    return incident_service.update_incident(db, incident, payload)

@router.get("/{incident_id}/timeline")
def get_incident_timeline(
    incident_id: int,
    db: Session = Depends(get_db),
):
    timeline = build_incident_timeline(db, incident_id)

    if timeline is None:
        raise HTTPException(status_code=404, detail="Incident not found")

    return timeline

@router.get("/{incident_id}/notes", response_model=list[AnalystNoteRead])
def list_incident_notes(
    incident_id: int,
    db: Session = Depends(get_db),
):
    incident = incident_service.get_incident(db, incident_id)

    if incident is None:
        raise HTTPException(status_code=404, detail="Incident not found")

    return (
        db.query(AnalystNote)
        .filter(AnalystNote.incident_id == incident_id)
        .order_by(AnalystNote.created_at.desc())
        .all()
    )


@router.post("/{incident_id}/notes", response_model=AnalystNoteRead)
def create_incident_note(
    incident_id: int,
    payload: AnalystNoteCreate,
    db: Session = Depends(get_db),
):
    incident = incident_service.get_incident(db, incident_id)

    if incident is None:
        raise HTTPException(status_code=404, detail="Incident not found")

    note = AnalystNote(
        organization_id=incident.organization_id,
        incident_id=incident.id,
        user_id=payload.user_id,
        note=payload.note,
    )

    db.add(note)
    db.commit()
    db.refresh(note)

    return note