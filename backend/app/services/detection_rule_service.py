from sqlalchemy.orm import Session

from app.models.detection_rule import DetectionRule
from app.schemas.detection_rule import (
    DetectionRuleCreate,
    DetectionRuleUpdate,
)


def get_rules(db: Session):
    return db.query(DetectionRule).all()


def get_rule(db: Session, rule_id: int):
    return (
        db.query(DetectionRule)
        .filter(DetectionRule.id == rule_id)
        .first()
    )


def create_rule(
    db: Session,
    rule_data: DetectionRuleCreate,
):
    rule = DetectionRule(**rule_data.model_dump())

    db.add(rule)
    db.commit()
    db.refresh(rule)

    return rule


def update_rule(
    db: Session,
    rule: DetectionRule,
    rule_data: DetectionRuleUpdate,
):
    updates = rule_data.model_dump(exclude_unset=True)

    for key, value in updates.items():
        setattr(rule, key, value)

    db.commit()
    db.refresh(rule)

    return rule


def delete_rule(
    db: Session,
    rule: DetectionRule,
):
    db.delete(rule)
    db.commit()