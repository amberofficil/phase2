from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import uuid

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: Optional[str] = "pending"  # Default to 'pending'

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None

class TaskResponse(BaseModel):
    id: uuid.UUID
    title: str
    description: Optional[str]
    status: str
    user_id: uuid.UUID
    created_at: datetime
    updated_at: datetime