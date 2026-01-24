import asyncio
from fastapi import FastAPI
from fastapi.testclient import TestClient
import sys
import os
import traceback

# Add the backend directory to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from main import app

# Enable debug mode
import logging
logging.basicConfig(level=logging.DEBUG)

def test_register_endpoint():
    client = TestClient(app, raise_server_exceptions=False)

    # Test the root endpoint first
    response = client.get("/")
    print(f"Root endpoint: {response.status_code} - {response.json()}")

    # Test the register endpoint
    register_data = {
        "email": "test@example.com",
        "password": "testpassword"
    }

    print("Testing register endpoint...")
    try:
        response = client.post("/api/register", json=register_data)
        print(f"Register endpoint: {response.status_code}")
        print(f"Response: {response.text}")

        # Get the exception info if there was one
        if hasattr(response, 'exception') and response.exception:
            print("Exception details:")
            print(response.exception)
            traceback.print_tb(response.exception.__traceback__)

        if response.status_code != 200:
            print("Error occurred!")

    except Exception as e:
        print(f"Exception during request: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    test_register_endpoint()