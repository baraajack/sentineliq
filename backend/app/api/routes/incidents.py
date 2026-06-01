from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.schemas.incident import IncidentCreate, IncidentRead, IncidentUpdate
from app.services import incident_service


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
