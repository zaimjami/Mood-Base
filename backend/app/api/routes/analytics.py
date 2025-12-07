"""Analytics routes – mood trends + forecast."""
from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ...models.mood_model import MoodLog
from ...models.user_model import User
from ...schemas import MoodPoint, MoodAnalyticsResponse
from ...services.mood_service import compute_average_score, forecast_mood
from ..dependencies import get_db, get_current_user

router = APIRouter()


@router.get("/mood", response_model=MoodAnalyticsResponse)
def mood_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    rows: List[MoodLog] = (
        db.query(MoodLog)
        .filter(MoodLog.user_id == current_user.id)
        .order_by(MoodLog.date.asc())
        .all()
    )
    history = [MoodPoint(date=r.date, score=r.score) for r in rows]
    avg = compute_average_score(history)
    forecast = forecast_mood(history, days=7)
    return MoodAnalyticsResponse(history=history, forecast=forecast, average_score=avg)
