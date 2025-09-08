from typing import Generator
from sqlmodel import create_engine, Session, SQLModel
from core.config import settings

engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,  # Only echo in debug mode
    pool_pre_ping=True,   # Verify connections before use
    pool_recycle=3600,    # Recycle connections every hour
)

def init_db() -> None:
    """Initialize database tables"""
    SQLModel.metadata.create_all(engine)

def get_session() -> Generator[Session, None, None]:
    """Dependency to get database session"""
    with Session(engine) as session:
        yield session