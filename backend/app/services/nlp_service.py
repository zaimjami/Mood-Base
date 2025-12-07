"""Tiny NLP service using TextBlob for sentiment."""
from textblob import TextBlob


def analyze_sentiment(text: str) -> tuple[float, str]:
    """Return (polarity, label) where polarity is in [-1, 1]."""
    if not text.strip():
        return 0.0, "neutral"

    blob = TextBlob(text)
    polarity = float(blob.sentiment.polarity)

    if polarity > 0.15:
        label = "positive"
    elif polarity < -0.15:
        label = "negative"
    else:
        label = "neutral"

    return polarity, label
