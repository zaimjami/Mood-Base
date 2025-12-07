"""Database engine and session factory."""
from contextlib import contextmanager

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

from .core.config import settings


class Base(DeclarativeBase):
    """Base for SQLAlchemy models."""
    pass


engine = create_engine(settings.DATABASE_URL, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db() -> None:
    """Create all tables if they don't exist."""
    from .models import user_model, entry_model, mood_model  # noqa
    Base.metadata.create_all(bind=engine)


@contextmanager
def get_db_session():
    """Yield a DB session and make sure it closes afterwards."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
