import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
    assert response.json()["service"] == "todo-backend"

def test_tasks_unauthorized():
    # Test that accessing tasks endpoints without auth returns 401
    response = client.get("/api/tasks")
    assert response.status_code == 401

    response = client.post("/api/tasks", json={"title": "Test task"})
    assert response.status_code == 401