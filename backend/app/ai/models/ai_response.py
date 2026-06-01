from pydantic import BaseModel


class AIResponse(BaseModel):
    summary: str
    confidence: str
    evidence: list[str]
    recommended_actions: list[str]