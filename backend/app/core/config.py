from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "SentinelIQ"
    environment: str = "development"

    postgres_host: str = "postgres"
    postgres_port: int = 5432
    postgres_db: str = "sentineliq"
    postgres_user: str = "sentineliq"
    postgres_password: str = "sentineliq_password"

    redis_host: str = "redis"
    redis_port: int = 6379

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def database_url(self) -> str:
        return (
            f"postgresql+psycopg://{self.postgres_user}:"
            f"{self.postgres_password}@{self.postgres_host}:"
            f"{self.postgres_port}/{self.postgres_db}"
        )


settings = Settings()