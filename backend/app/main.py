from fastapi import FastAPI

app = FastAPI(
    title="SprintFlow API",
    version="1.0.0",
    description="Backend API for SprintFlow Project Management System"
)


@app.get("/")
def root():
    return {"message": "SprintFlow Backend Running 🚀"}