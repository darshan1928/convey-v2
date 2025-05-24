from fastapi import FastAPI
import uvicorn
from app.core.database import init_db, close_db
from fastapi.middleware.cors import CORSMiddleware
from app.routes import user

app = FastAPI(
    title="Convey API",
    version="1.0.0",
    description="Backend API for user signup and login using FastAPI + MongoDB",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# API Routing
app.include_router(user.router, prefix="/api/v1")


@app.on_event("startup")
async def startup_event():
    await init_db()


@app.on_event("shutdown")
async def shutdown_event():
    await close_db()


@app.get("/")
def read_root():
    return {"message": "Welcome to the  Clone!"}


if __name__ == "__main__":
    # Programmatically run the server on port 8080
    uvicorn.run("app.main:app", host="127.0.0.1", port=8080, reload=True)
