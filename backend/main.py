from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import routers
from routes import tasks

app = FastAPI(
    title="Todo Application Backend API",
    description="Backend API for the Todo Application with JWT authentication and user data isolation",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(tasks.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Todo Application Backend API"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "todo-backend"}