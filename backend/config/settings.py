from pydantic import BaseSettings
from typing import Optional
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Settings(BaseSettings):
    # Database settings
    neon_db_url: str = os.getenv("NEON_DB_URL", "")

    # Auth settings
    better_auth_secret: str = os.getenv("BETTER_AUTH_SECRET", "")
    better_auth_url: str = os.getenv("BETTER_AUTH_URL", "http://localhost:3000")

    # Server settings
    port: int = int(os.getenv("PORT", "8000"))

    class Config:
        env_file = ".env"

settings = Settings()