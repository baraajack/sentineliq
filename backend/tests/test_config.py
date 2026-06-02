from app.core.config import settings


def test_settings_defaults_are_available():
    assert settings.app_name == "SentinelIQ"
    assert settings.environment in ["development", "production", "test"]
    assert settings.log_level
    assert settings.database_url.startswith("postgresql+psycopg://")