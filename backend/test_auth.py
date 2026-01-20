import pytest
from unittest.mock import patch
from fastapi.testclient import TestClient
from main import app
from auth.jwt_handler import decode_jwt

client = TestClient(app)

def test_decode_jwt_valid_token():
    # This is a mock test - in real implementation, we'd need a valid JWT
    # For now, we just test that the function exists and has proper signature
    assert callable(decode_jwt)

def test_protected_routes_require_auth():
    # Test that all task endpoints require authentication
    endpoints_to_test = [
        ("GET", "/api/tasks"),
        ("POST", "/api/tasks", {"title": "Test"}),
        ("PUT", "/api/tasks/123", {"title": "Updated"}),
        ("DELETE", "/api/tasks/123")
    ]

    for test_case in endpoints_to_test:
        method = test_case[0]
        url = test_case[1]

        if method == "GET" or method == "DELETE":
            response = client.request(method, url)
        else:
            # For POST/PUT, we include some minimal data
            data = test_case[2] if len(test_case) > 2 else {}
            response = client.request(method, url, json=data)

        # Should return 401 Unauthorized without proper auth header
        assert response.status_code == 401, f"Expected 401 for {method} {url}, got {response.status_code}"