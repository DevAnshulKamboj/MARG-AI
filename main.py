from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from . import models  # noqa: F401  (registers the users table)
from .database import Base, engine
from .routes import router

from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)  # creates tables on first start

app = FastAPI(title="Login API", docs_url=None, redoc_url=None, openapi_url=None)  # hides /docs publicly
app.include_router(router, prefix="/api")

STATIC_DIR = Path(__file__).resolve().parent.parent / "static"
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


@app.get("/", include_in_schema=False)
def index():
    return FileResponse(STATIC_DIR / "login.html")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://devanshulkamboj.github.io",
        "https://marg-ai-26027-2026.netlify.app",
    ],
    allow_credentials=False,   # you use a Bearer header, not cookies
    allow_methods=["*"],
    allow_headers=["*"],
)