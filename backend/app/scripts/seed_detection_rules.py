from app.core.database import SessionLocal
from app.services.detection_rule_seed import seed_detection_rules

db = SessionLocal()

try:
    seed_detection_rules(db)
finally:
    db.close()