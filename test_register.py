import time
import requests
import json

# Wait a bit for the server to start
time.sleep(5)

# Test the register endpoint
url = "http://localhost:7860/api/register"
headers = {
    "Content-Type": "application/json"
}

data = {
    "email": "test@example.com",
    "password": "testpassword"
}

try:
    response = requests.post(url, headers=headers, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error connecting to server: {e}")