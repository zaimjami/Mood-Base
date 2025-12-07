"""Mood logging routes."""
from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ...models.mood_model import MoodLog
from ...models.user_model import User
from ...schemas import MoodLogCreate, MoodLogOut
from ..dependencies import get_db, get_current_user

router = APIRouter()


@router.post("/", response_model=MoodLogOut, status_code=201)
def log_mood(
    mood_in: MoodLogCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    existing = (
        db.query(MoodLog)
        .filter(MoodLog.user_id == current_user.id, MoodLog.date == mood_in.date)
        .first()
    )
    if existing:
        existing.score = mood_in.score
        db.commit()
        db.refresh(existing)
        return existing

    mood = MoodLog(
        user_id=current_user.id,
        date=mood_in.date,
        score=mood_in.score,
    )
    db.add(mood)
    db.commit()
    db.refresh(mood)
    return mood


@router.get("/", response_model=List[MoodLogOut])
def list_moods(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    moods = (
        db.query(MoodLog)
        .filter(MoodLog.user_id == current_user.id)
        .order_by(MoodLog.date.asc())
        .all()
    )
    return moods
