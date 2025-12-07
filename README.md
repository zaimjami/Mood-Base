# MoodBuddy 🧠💙

MoodBuddy is a full-stack mental health journaling and mood tracking app.
It's built to show off **systems thinking**, **ML/NLP integration**, and a clean
frontend–backend architecture in a way that's realistic for a strong CS undergrad.

This repo is structured as a small constellation of services:

- `frontend/` – React SPA (journal, mood logging, dashboard)
- `backend/` – FastAPI backend (auth, entries, mood analytics, NLP)
- `database/` – Optional SQL init helpers
- `.github/workflows/` – CI pipeline (tests + Docker builds)
- `docker-compose.yml` – One-command local deployment

> ⚠️ Disclaimer: MoodBuddy is **not** a replacement for therapy or professional care.
> It's a learning project and a personal reflection tool only.

---

## Quick Start (Docker)

```bash
git clone https://github.com/<your-username>/moodbuddy.git
cd moodbuddy
cp backend/.env.example backend/.env
docker-compose up --build
```

By default you should get:

- Frontend: http://localhost:3000
- Backend docs (Swagger): http://localhost:8000/docs

For more, see comments in the code – they read like a teammate walking you through the logic.
