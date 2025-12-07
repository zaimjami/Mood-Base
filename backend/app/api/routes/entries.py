"""Journal entry routes."""
from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ...models.entry_model import JournalEntry
from ...models.user_model import User
from ...schemas import JournalEntryCreate, JournalEntryOut
from ...services.nlp_service import analyze_sentiment
from ..dependencies import get_db, get_current_user

router = APIRouter()


@router.post("/", response_model=JournalEntryOut, status_code=201)
def create_entry(
    entry_in: JournalEntryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    sentiment_score, sentiment_label = analyze_sentiment(entry_in.content)
    entry = JournalEntry(
        user_id=current_user.id,
        title=entry_in.title,
        content=entry_in.content,
        sentiment_score=sentiment_score,
        sentiment_label=sentiment_label,
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


@router.get("/", response_model=List[JournalEntryOut])
def list_entries(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    entries = (
        db.query(JournalEntry)
        .filter(JournalEntry.user_id == current_user.id)
        .order_by(JournalEntry.created_at.desc())
        .all()
    )
    return entries
