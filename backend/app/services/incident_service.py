from sqlalchemy.orm import Session

from app.models.incident import Incident
from app.schemas.incident import IncidentCreate, IncidentUpdate


def get_incidents(db: Session):
    return db.query(Incident).order_by(Incident.created_at.desc()).all()


def get_incident(db: Session, incident_id: int):
    return db.query(Incident).filter(Incident.id == incident_id).first()


def create_incident(db: Session, payload: IncidentCreate):
    incident = Incident(**payload.model_dump())

    db.add(incident)
    db.commit()
    db.refresh(incident)

    return incident


def update_incident(
    db: Session,
    incident: Incident,
    payload: IncidentUpdate,
):
    updates = payload.model_dump(exclude_unset=True)

    for key, value in updates.items():
        setattr(incident, key, value)

    db.commit()
    db.refresh(incident)

    return incident