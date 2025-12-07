"""App configuration and settings."""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "MoodBuddy"
    APP_ENV: str = "development"

    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    DATABASE_URL: str

    class Config:
        env_file = ".env"


settings = Settings()
