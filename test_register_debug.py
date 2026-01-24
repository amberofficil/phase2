import time
import requests
import json

print("Waiting for server to start...")
# Wait a bit for the server to start
time.sleep(10)

# Test the register endpoint
url = "http://localhost:7860/api/register"
headers = {
    "Content-Type": "application/json"
}

data = {
    "email": "test@example.com",
    "password": "testpassword"
}

print(f"Sending request to {url}")
try:
    response = requests.post(url, headers=headers, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code == 200:
        print("SUCCESS: Register endpoint is working!")
    else:
        print("FAILED: Register endpoint returned an error.")
        
except requests.exceptions.ConnectionError:
    print("ERROR: Could not connect to the server. Is it running?")
except Exception as e:
    print(f"Error connecting to server: {e}")

# Also test the root endpoint
print("\nTesting root endpoint...")
try:
    root_response = requests.get("http://localhost:7860/")
    print(f"Root endpoint status: {root_response.status_code}")
    print(f"Root response: {root_response.text}")
except Exception as e:
    print(f"Error testing root endpoint: {e}")

input("\nPress Enter to exit...")