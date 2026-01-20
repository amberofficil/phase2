from sqlmodel import SQLModel
from sqlalchemy import func
from datetime import datetime
from typing import Optional
from pydantic import Field

class TimestampMixin(SQLModel):
    created_at: Optional[datetime] = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = Field(default_factory=datetime.now, sa_column_kwargs={"onupdate": func.now()})