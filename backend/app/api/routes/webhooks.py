from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.models.webhook import Webhook
from app.schemas.webhook import WebhookCreate, WebhookRead, WebhookUpdate


router = APIRouter(prefix="/api/webhooks", tags=["webhooks"])


@router.get("", response_model=list[WebhookRead])
def list_webhooks(db: Session = Depends(get_db)):
    return db.query(Webhook).order_by(Webhook.created_at.desc()).all()


@router.post("", response_model=WebhookRead, status_code=status.HTTP_201_CREATED)
def create_webhook(
    payload: WebhookCreate,
    db: Session = Depends(get_db),
):
    webhook = Webhook(**payload.model_dump())

    db.add(webhook)
    db.commit()
    db.refresh(webhook)

    return webhook


@router.patch("/{webhook_id}", response_model=WebhookRead)
def update_webhook(
    webhook_id: int,
    payload: WebhookUpdate,
    db: Session = Depends(get_db),
):
    webhook = db.query(Webhook).filter(Webhook.id == webhook_id).first()

    if webhook is None:
        raise HTTPException(status_code=404, detail="Webhook not found")

    updates = payload.model_dump(exclude_unset=True)

    for key, value in updates.items():
        setattr(webhook, key, value)

    db.commit()
    db.refresh(webhook)

    return webhook


@router.delete("/{webhook_id}")
def delete_webhook(
    webhook_id: int,
    db: Session = Depends(get_db),
):
    webhook = db.query(Webhook).filter(Webhook.id == webhook_id).first()

    if webhook is None:
        raise HTTPException(status_code=404, detail="Webhook not found")

    db.delete(webhook)
    db.commit()

    return {"deleted": True}