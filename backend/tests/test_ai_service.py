from app.services.ai_service import AIService


def test_ai_service_explain_alert_returns_structured_response():
    context = {
        "alert": {
            "id": 1,
            "title": "Test alert",
            "severity": "high",
            "status": "open",
        },
        "asset": None,
    }

    result = AIService().explain_alert(context)

    assert result.summary
    assert result.confidence == "low"
    assert isinstance(result.evidence, list)
    assert isinstance(result.recommended_actions, list)