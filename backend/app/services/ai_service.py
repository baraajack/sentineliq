from app.ai.models.ai_response import AIResponse
from app.ai.prompts.explain_alert import SYSTEM_PROMPT


class AIService:
    def explain_alert(self, context: dict) -> AIResponse:
        return AIResponse(
            summary=(
                "AI service foundation is ready. "
                "OpenAI integration is intentionally not enabled yet."
            ),
            confidence="low",
            evidence=[
                f"System prompt loaded: {bool(SYSTEM_PROMPT)}",
                f"Alert context keys: {', '.join(context.keys())}",
            ],
            recommended_actions=[
                "Review the alert context manually.",
                "Verify affected asset and source IP.",
                "Proceed with OpenAI integration only after context validation.",
            ],
        )