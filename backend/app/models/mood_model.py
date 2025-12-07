"""Mood log model – simple 1–5 rating per day."""
from sqlalchemy import Column, Integer, Date, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship

from ..db import Base


class MoodLog(Base):
    __tablename__ = "mood_logs"
    __table_args__ = (
        UniqueConstraint("user_id", "date", name="uq_user_date_mood"),
    )

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    date = Column(Date, nullable=False)
    score = Column(Integer, nullable=False)

    user = relationship("User", back_populates="mood_logs")
