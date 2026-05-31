from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.schemas.detection_rule import (
    DetectionRuleCreate,
    DetectionRuleRead,
    DetectionRuleUpdate,
)
from app.services import detection_rule_service


router = APIRouter(prefix="/api/detection-rules", tags=["detection-rules"])


@router.get("", response_model=list[DetectionRuleRead])
def list_detection_rules(db: Session = Depends(get_db)):
    return detection_rule_service.get_rules(db)


@router.post(
    "",
    response_model=DetectionRuleRead,
    status_code=status.HTTP_201_CREATED,
)
def create_detection_rule(
    payload: DetectionRuleCreate,
    db: Session = Depends(get_db),
):
    return detection_rule_service.create_rule(db, payload)


@router.get("/{rule_id}", response_model=DetectionRuleRead)
def get_detection_rule(rule_id: int, db: Session = Depends(get_db)):
    rule = detection_rule_service.get_rule(db, rule_id)

    if rule is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Detection rule not found",
        )

    return rule


@router.patch("/{rule_id}", response_model=DetectionRuleRead)
def update_detection_rule(
    rule_id: int,
    payload: DetectionRuleUpdate,
    db: Session = Depends(get_db),
):
    rule = detection_rule_service.get_rule(db, rule_id)

    if rule is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Detection rule not found",
        )

    return detection_rule_service.update_rule(db, rule, payload)


@router.delete("/{rule_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_detection_rule(rule_id: int, db: Session = Depends(get_db)):
    rule = detection_rule_service.get_rule(db, rule_id)

    if rule is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Detection rule not found",
        )

    detection_rule_service.delete_rule(db, rule)