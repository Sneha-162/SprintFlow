from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.config import settings
from app.database.session import get_db


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Backend API for the SprintFlow Project Management System",
)


@app.get("/")
def root() -> dict[str, str]:
    return {
        "message": "SprintFlow Backend Running",
        "environment": settings.environment,
    }


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "healthy"}


@app.get("/health/database")
def database_health(
    database_session: Session = Depends(get_db),
) -> dict[str, str]:
    database_session.execute(text("SELECT 1"))

    return {
        "status": "healthy",
        "database": "connected",
    }