from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import routers
from routes import tasks, auth

app = FastAPI(
    title="Todo Application Backend API",
    description="Backend API for the Todo Application with JWT authentication and user data isolation",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://phase2-nine.vercel.app",  # Production Vercel domain
        "http://localhost:3000",          # Local development
        "http://localhost:3001",          # Alternative local port
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(tasks.router, prefix="/api")
app.include_router(auth.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Todo Application Backend API"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "todo-backend"}