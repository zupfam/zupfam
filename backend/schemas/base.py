import base64
import json
import uuid
from datetime import datetime, timezone
from typing import Any, Union

from pydantic import ConfigDict
from sqlmodel import Field, SQLModel


class TimestampMixin(SQLModel):
    """Mixin for timestamp fields with proper timezone handling."""

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        nullable=False,
        description="Timestamp when the record was created"
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        nullable=False,
        description="Timestamp when the record was last updated"
    )

    def touch(self) -> None:
        """Update the updated_at field to current UTC time."""
        self.updated_at = datetime.now(timezone.utc)


class BaseDBModel(TimestampMixin):
    """
    Base model for all database tables with autoincrement primary key.

    Features:
    - Autoincrement integer primary key (human-readable)
    - UTC timestamps with timezone awareness
    """

    id: int = Field(
        default=None,
        primary_key=True,
        index=True,
        nullable=False,
        description="Auto-incrementing primary key"
    )

    is_active: bool = Field(
        default=True,
        nullable=False,
        index=True,
        description="Soft delete flag - False indicates deleted record"
    )

    def soft_delete(self) -> None:
        """Soft delete the record by setting is_active to False."""
        self.is_active = False
        self.touch()

    def restore(self) -> None:
        """Restore a soft-deleted record."""
        self.is_active = True
        self.touch()


class BaseDBModelUUID(BaseDBModel):
    """
    Base model with both autoincrement ID and UUID reference.

    Use this for tables that need external UUID references while
    maintaining human-readable autoincrement primary keys.
    """
    uuid: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        nullable=False,
        unique=True,
        index=True,
        description="Unique UUID for external references"
    )


class BaseAPIRequest(SQLModel):
    """
    Base model for API request schemas.

    Features:
    - Excludes database-specific fields
    - Validation configuration
    - Custom field validation
    """

    model_config = ConfigDict(
        populate_by_name=True,
        validate_assignment=True,
        use_enum_values=True,
        str_strip_whitespace=True,
        str_min_length=0
    )


class BaseAPIResponse(SQLModel):
    """
    Base model for API response schemas.

    Features:
    - Includes common response fields
    - Proper serialization configuration
    - Timezone-aware datetime handling
    """

    model_config = ConfigDict(
        populate_by_name=True,
        json_encoders={
            datetime: lambda datestr: datestr.isoformat() if datestr else None
        },
    )

    message: str = Field(description="UI response message")
    data: dict[Any] = Field(description="Response dictionary")

def encode_cursor(data: dict) -> str:
    """
    Encode cursor data to base64 string.

    Args:
        data: Dictionary containing cursor information (e.g., {'id': 123,
        'created_at': '2023-...'})

    Returns:
        Base64 encoded cursor string

    Example:
        cursor = encode_cursor({'id': 123, 'created_at': '2023-01-01T00:00:00Z'})
    """
    json_str = json.dumps(data, default=str)
    return base64.urlsafe_b64encode(json_str.encode()).decode()


def decode_cursor(cursor: str) -> dict:
    """
    Decode base64 cursor string to dictionary.

    Args:
        cursor: Base64 encoded cursor string

    Returns:
        Dictionary containing cursor information

    Example:
        data = decode_cursor(cursor_string)
        # data = {'id': 123, 'created_at': '2023-01-01T00:00:00Z'}
    """
    try:
        json_str = base64.urlsafe_b64decode(cursor.encode()).decode()
        return json.loads(json_str)
    except Exception:
        raise ValueError("Invalid cursor format")


class CursorPaginatedRequestMixin(SQLModel):
    cursor: Union[str, None] = Field(description="encoded cursor")
    size: int = Field(description="Page size")
    fetch_next: bool = Field(True, description="cursor direction")


class CursorPaginatedResponse(SQLModel):
    """Generic cursor based paginated response model."""
    items: list[Any] = Field(description="List of items")
    next_cursor: str = Field(description="encoded dict with next cursor key")
    prev_cursor: str = Field(description="encoded dict with prev cursor key")
    has_next: bool = Field(description="Whether there's a next page")
    has_prev: bool = Field(description="Whether there's a previous page")
    size: int = Field(description="Items per page")


class PaginatedRequestMixin(SQLModel):
    """Generic paginated response model."""
    page: int = Field(description="Current page number")
    size: int = Field(description="Page size")


class PaginatedResponse(SQLModel):
    """Generic paginated response model."""
    items: list[Any] = Field(description="List of items")
    total: int = Field(description="Total number of items")
    page: int = Field(description="Current page number")
    size: int = Field(description="Items per page")
    pages: int = Field(description="Total number of pages")
    has_next: bool = Field(description="Whether there's a next page")
    has_prev: bool = Field(description="Whether there's a previous page")


# Example usage with FastAPI endpoint
"""
Cursor Pagination Usage Example:

@app.get("/users", response_model=CursorPaginatedResponse[UserResponse])
async def get_users(
    pagination: CursorPaginationParams = Depends(),
    session: Session = Depends(get_session)
):
    query = select(User).order_by(User.id)

    if pagination.cursor:
        cursor_data = decode_cursor(pagination.cursor)
        if pagination.direction == "next":
            query = query.where(User.id > cursor_data['id'])
        else:
            query = query.where(User.id < cursor_data['id']).order_by(User.id.desc())

    # Get one extra item to check if there's a next page
    users = session.exec(query.limit(pagination.size + 1)).all()

    has_next = len(users) > pagination.size
    if has_next:
        users = users[:-1]  # Remove the extra item

    # Create cursors
    next_cursor = None
    prev_cursor = None

    if users:
        if has_next:
            next_cursor = encode_cursor({'id': users[-1].id})
        if pagination.cursor or len(users) > 0:
            prev_cursor = encode_cursor({'id': users[0].id})

    return CursorPaginatedResponse(
        items=[UserResponse.from_orm(user) for user in users],
        has_next=has_next,
        has_prev=pagination.cursor is not None,
        next_cursor=next_cursor,
        prev_cursor=prev_cursor
    )
"""
