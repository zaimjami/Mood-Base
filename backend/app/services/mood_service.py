"""Mood analytics helpers (average + simple forecast)."""
from __future__ import annotations

from datetime import timedelta
from typing import List

from ..schemas import MoodPoint, MoodForecastPoint


def compute_average_score(history: List[MoodPoint]):
    """Return average mood score or None."""
    if not history:
        return None
    return sum(p.score for p in history) / len(history)


def forecast_mood(history: List[MoodPoint], days: int = 7) -> List[MoodForecastPoint]:
    """Produce a naive forecast extending the trend between first and last."""
    if not history:
        return []

    history_sorted = sorted(history, key=lambda p: p.date)
    first = history_sorted[0]
    last = history_sorted[-1]
    span_days = max((last.date - first.date).days, 1)
    slope = (last.score - first.score) / span_days

    forecast: List[MoodForecastPoint] = []
    for i in range(1, days + 1):
        future_date = last.date + timedelta(days=i)
        predicted = last.score + slope * i
        predicted = max(1.0, min(5.0, predicted))
        forecast.append(MoodForecastPoint(date=future_date, predicted_score=predicted))
    return forecast
