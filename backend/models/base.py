# models/base.py
from sqlmodel import SQLModel, Field
from sqlalchemy import func
from datetime import datetime

class TimestampMixin(SQLModel):
    __abstract__ = True  # SQLModel ko bata do ye table nahi hai

    created_at: datetime = Field(default=datetime.utcnow(), nullable=False)
    updated_at: datetime = Field(
        default=datetime.utcnow(),
        nullable=False,
        sa_column_kwargs={"onupdate": func.now()}
    )



