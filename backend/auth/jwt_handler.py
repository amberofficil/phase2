from fastapi import HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from config.settings import settings
from typing import Dict, Optional
import json

security = HTTPBearer()

def decode_jwt(token: str) -> Optional[Dict]:
    """
    Decode and verify JWT token using BETTER_AUTH_SECRET
    """
    try:
        payload = jwt.decode(
            token,
            settings.better_auth_secret,
            algorithms=["RS256"]  # Better Auth typically uses RS256
        )
        return payload
    except JWTError:
        return None

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Get current user from JWT token
    """
    token = credentials.credentials

    decoded_token = decode_jwt(token)

    if decoded_token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Extract user_id from the token (this depends on how Better Auth structures the JWT)
    # Common claim names for user ID: 'sub', 'user_id', 'id'
    user_id = decoded_token.get('sub') or decoded_token.get('user_id') or decoded_token.get('id')

    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return {"user_id": user_id}

def verify_jwt_token(token: str) -> bool:
    """
    Verify JWT token is valid
    """
    return decode_jwt(token) is not None