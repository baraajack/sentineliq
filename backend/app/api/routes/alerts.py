from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.models.alert import Alert
from app.schemas.alert import AlertRead, AlertStatusUpdate
from app.models.incident import Incident
from app.models.incident_alert import IncidentAlert
from app.schemas.incident import IncidentRead


router = APIRouter(prefix="/api/alerts", tags=["alerts"])


@router.get("", response_model=list[AlertRead])
def list_alerts(db: Session = Depends(get_db)):
    return db.query(Alert).order_by(Alert.last_seen_at.desc()).all()


@router.get("/{alert_id}", response_model=AlertRead)
def get_alert(alert_id: int, db: Session = Depends(get_db)):
    alert = db.query(Alert).filter(Alert.id == alert_id).first()

    if alert is None:
        raise HTTPException(status_code=404, detail="Alert not found")

    return alert


@router.patch("/{alert_id}/status", response_model=AlertRead)
def update_alert_status(
    alert_id: int,
    payload: AlertStatusUpdate,
    db: Session = Depends(get_db),
):
    alert = db.query(Alert).filter(Alert.id == alert_id).first()

    if alert is None:
        raise HTTPException(status_code=404, detail="Alert not found")

    alert.status = payload.status

    db.commit()
    db.refresh(alert)

    return alert

@router.post("/{alert_id}/create-incident", response_model=IncidentRead)
def create_incident_from_alert(
    alert_id: int,
    db: Session = Depends(get_db),
):
    alert = db.query(Alert).filter(Alert.id == alert_id).first()

    if alert is None:
        raise HTTPException(status_code=404, detail="Alert not found")

    existing_link = (
        db.query(IncidentAlert)
        .filter(IncidentAlert.alert_id == alert.id)
        .first()
    )

    if existing_link is not None:
        incident = (
            db.query(Incident)
            .filter(Incident.id == existing_link.incident_id)
            .first()
        )

        if incident is not None:
            return incident

    incident = Incident(
        organization_id=alert.organization_id,
        title=alert.title,
        description=alert.description,
        severity=alert.severity,
        status="open",
        assigned_to_user_id=None,
        created_from_alert_id=alert.id,
    )

    db.add(incident)
    db.commit()
    db.refresh(incident)

    link = IncidentAlert(
        incident_id=incident.id,
        alert_id=alert.id,
    )

    db.add(link)
    db.commit()
    db.refresh(incident)

    return incident