from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
from .base import TimestampMixin
import uuid

class UserBase(SQLModel):
    email: str = Field(unique=True, nullable=False, max_length=255)

class User(UserBase, TimestampMixin, table=True):
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    password_hash: str = Field(nullable=False)

    # This is just the model - the backend does not handle registration/login
    # These are managed by Better Auth, the backend only verifies JWTs