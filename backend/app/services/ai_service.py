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
    
    def summarize_incident(self, context: dict) -> AIResponse:
        incident = context["incident"]

        return AIResponse(
            summary=(
                f"Incident '{incident['title']}' "
                f"is currently '{incident['status']}' "
                f"with severity '{incident['severity']}'."
            ),
            confidence="low",
            evidence=[
                f"Linked alerts: {len(context['alerts'])}",
                f"Analyst notes: {len(context['notes'])}",
            ],
            recommended_actions=[
                "Review linked alerts.",
                "Review analyst notes.",
                "Validate affected assets.",
            ],
        )
    
    def generate_incident_report(self, context: dict) -> str:
        incident = context["incident"]

        return (
            f"# Incident Report\n\n"
            f"## Executive Summary\n"
            f"Incident '{incident['title']}' is currently "
            f"'{incident['status']}' with severity '{incident['severity']}'.\n\n"
            f"## Evidence\n"
            f"- Linked alerts: {len(context['alerts'])}\n"
            f"- Analyst notes: {len(context['notes'])}\n\n"
            f"## Recommendations\n"
            f"- Review linked alerts.\n"
            f"- Validate affected assets.\n"
            f"- Continue analyst-led investigation.\n"
        )