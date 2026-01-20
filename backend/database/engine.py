from sqlmodel import create_engine
from config.settings import settings
import os

# Set environment variables for Neon if not already set
if settings.neon_db_url:
    os.environ['NEON_DB_URL'] = settings.neon_db_url

# Create the database engine
engine = create_engine(
    settings.neon_db_url,
    echo=False,  # Set to True for SQL query logging
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
    pool_recycle=300,
)