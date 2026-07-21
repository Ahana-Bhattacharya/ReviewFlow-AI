from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import review


app = FastAPI(
    title="ReviewFlow AI API",
    version="1.0.0",
    description="AI powered code review platform"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    review.router,
    prefix="/api"
)


@app.get("/")
def home():

    return {
        "status": "running",
        "message": "ReviewFlow AI Backend Running"
    }