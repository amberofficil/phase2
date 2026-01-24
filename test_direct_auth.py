import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

import asyncio
from unittest.mock import AsyncMock, MagicMock
from fastapi import Request
from sqlmodel import Session
from routes.auth import register_user
import traceback

def test_direct_call():
    # Create mock request object
    mock_request = MagicMock()
    mock_request.json = AsyncMock(return_value={"email": "test@example.com", "password": "testpassword"})
    
    # Create a real session
    from database.session import get_session
    
    # Get a real session
    session_gen = get_session()
    session = next(session_gen)
    
    try:
        print("Calling register_user function directly...")
        result = asyncio.run(register_user(mock_request, session))
        print(f"Success: {result}")
    except Exception as e:
        print(f"Error occurred: {e}")
        print("Full traceback:")
        traceback.print_exc()
    finally:
        session.close()

if __name__ == "__main__":
    test_direct_call()