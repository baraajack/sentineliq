from sqlalchemy.orm import Session

from app.models.webhook import Webhook
from app.models.webhook_delivery import WebhookDelivery


class WebhookService:
    def __init__(self, db: Session):
        self.db = db

    def get_enabled_webhooks(
        self,
        organization_id: int,
        event_type: str,
    ) -> list[Webhook]:
        return (
            self.db.query(Webhook)
            .filter(Webhook.organization_id == organization_id)
            .filter(Webhook.event_type == event_type)
            .filter(Webhook.enabled.is_(True))
            .all()
        )

    def record_delivery(
        self,
        webhook: Webhook,
        event_type: str,
        entity_id: int | None,
        status: str,
        response_code: int | None = None,
        error_message: str | None = None,
    ) -> WebhookDelivery:
        delivery = WebhookDelivery(
            webhook_id=webhook.id,
            event_type=event_type,
            entity_id=entity_id,
            status=status,
            response_code=response_code,
            error_message=error_message,
        )

        self.db.add(delivery)
        self.db.commit()
        self.db.refresh(delivery)

        return delivery