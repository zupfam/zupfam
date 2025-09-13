from datetime import datetime
from typing import Optional
from sqlalchemy import table
from sqlmodel import SQLModel, Field
import uuid


class DBSchema(SQLModel, table=True):
    """Custom base model for all database schemas."""

    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        index=True,
        nullable=False,
    )
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
    )
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
    )
    is_active: bool = Field(
        default=True,
        nullable=False,
    )

    def touch(self):
        """Update the `updated_at` field."""
        self.updated_at = datetime.utcnow()


class APISchema(SQLModel):
    """Custom base model for all API request response schemas."""
    ...