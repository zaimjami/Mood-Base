"""Journal entry model."""
from sqlalchemy import Column, Integer, String, Text, DateTime, Float, ForeignKey, func
from sqlalchemy.orm import relationship

from ..db import Base


class JournalEntry(Base):
    __tablename__ = "journal_entries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    title = Column(String(255), nullable=True)
    content = Column(Text, nullable=False)

    sentiment_score = Column(Float, nullable=True)
    sentiment_label = Column(String(32), nullable=True)

    user = relationship("User", back_populates="journal_entries")
