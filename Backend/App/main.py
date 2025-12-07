"""FastAPI application entrypoint."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.config import settings
from .api.routes import auth, entries, mood, analytics
from .db import init_db


def create_app() -> FastAPI:
    # Create the FastAPI app instance.
    app = FastAPI(
        title=settings.APP_NAME,
        version="0.1.0",
        description="MoodBuddy backend – because your feelings deserve a proper REST API.",
    )

    # CORS – let the React frontend talk to us without drama.
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Route modules.
    app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
    app.include_router(entries.router, prefix="/api/entries", tags=["entries"])
    app.include_router(mood.router, prefix="/api/mood", tags=["mood"])
    app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])

    @app.on_event("startup")
    async def on_startup():
        # Bootstrap DB schema.
        init_db()

    return app


app = create_app()
