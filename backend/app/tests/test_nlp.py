from app.services.nlp_service import analyze_sentiment


def test_analyze_sentiment_basic():
    score, label = analyze_sentiment("I am very happy today!")
    assert score >= 0  # sanity check
    assert label in {"positive", "neutral", "negative"}
