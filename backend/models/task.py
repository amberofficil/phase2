from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
from .base import TimestampMixin
import uuid

class TaskBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: Optional[str] = Field(default=None, max_length=1000)
    status: str = Field(default="pending", max_length=20)  # 'pending' or 'completed'

class Task(TaskBase, TimestampMixin, table=True):
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(nullable=False)  # We'll handle the foreign key differently to avoid circular imports