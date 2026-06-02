import json
from urllib import request, error

from sqlalchemy.orm import Session

from app.services.webhook_service import WebhookService


class NotificationService:
    def __init__(self, db: Session):
        self.db = db
        self.webhook_service = WebhookService(db)

    def send_event(
        self,
        organization_id: int,
        event_type: str,
        entity_id: int | None,
        payload: dict,
    ):
        webhooks = self.webhook_service.get_enabled_webhooks(
            organization_id=organization_id,
            event_type=event_type,
        )

        deliveries = []

        for webhook in webhooks:
            try:
                data = json.dumps(payload).encode("utf-8")

                req = request.Request(
                    webhook.target_url,
                    data=data,
                    headers={
                        "Content-Type": "application/json",
                    },
                    method="POST",
                )

                with request.urlopen(req, timeout=5) as response:
                    delivery = self.webhook_service.record_delivery(
                        webhook=webhook,
                        event_type=event_type,
                        entity_id=entity_id,
                        status="success",
                        response_code=response.status,
                    )

            except error.HTTPError as exc:
                delivery = self.webhook_service.record_delivery(
                    webhook=webhook,
                    event_type=event_type,
                    entity_id=entity_id,
                    status="failed",
                    response_code=exc.code,
                    error_message=str(exc),
                )

            except Exception as exc:
                delivery = self.webhook_service.record_delivery(
                    webhook=webhook,
                    event_type=event_type,
                    entity_id=entity_id,
                    status="failed",
                    error_message=str(exc),
                )

            deliveries.append(delivery)

        return deliveries