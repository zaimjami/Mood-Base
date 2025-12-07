"""Pydantic schemas for request/response models."""
from datetime import datetime, date
from typing import Optional, List

from pydantic import BaseModel, EmailStr, Field


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserBase(BaseModel):
    email: EmailStr


class UserCreate(UserBase):
    password: str = Field(min_length=6, max_length=128)


class UserOut(UserBase):
    id: int

    class Config:
        from_attributes = True


class JournalEntryBase(BaseModel):
    title: Optional[str] = None
    content: str


class JournalEntryCreate(JournalEntryBase):
    pass


class JournalEntryOut(JournalEntryBase):
    id: int
    created_at: datetime
    sentiment_score: Optional[float] = None
    sentiment_label: Optional[str] = None

    class Config:
        from_attributes = True


class MoodLogCreate(BaseModel):
    date: date
    score: int = Field(ge=1, le=5)


class MoodLogOut(BaseModel):
    id: int
    date: date
    score: int

    class Config:
        from_attributes = True


class MoodPoint(BaseModel):
    date: date
    score: int


class MoodForecastPoint(BaseModel):
    date: date
    predicted_score: float


class MoodAnalyticsResponse(BaseModel):
    history: List[MoodPoint]
    forecast: List[MoodForecastPoint]
    average_score: Optional[float] = None
