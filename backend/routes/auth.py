from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlmodel import Session, select
from database.session import get_session
from auth.jwt_handler import decode_jwt, verify_jwt_token
from schemas.response import ApiResponse
from models.user import User
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
from config.settings import settings
import uuid

router = APIRouter()

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT token creation
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=30)  # Default 30 minutes
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.better_auth_secret, algorithm="HS256")
    return encoded_jwt

def get_token_from_header(request: Request):
    """Extract token from Authorization header"""
    authorization = request.headers.get("Authorization")
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return authorization[len("Bearer "):]

@router.post("/register", response_model=ApiResponse)
async def register_user(request: Request, session: Session = Depends(get_session)):
    """
    Register a new user
    Expected fields: email, password
    """
    try:
        user_data = await request.json()

        # Check if user already exists
        existing_user = session.exec(select(User).where(User.email == user_data["email"])).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists"
            )

        # Hash the password
        hashed_password = pwd_context.hash(user_data["password"])

        # Create new user
        db_user = User(
            id=uuid.uuid4(),
            email=user_data["email"],
            password_hash=hashed_password
        )

        session.add(db_user)
        session.commit()
        session.refresh(db_user)

        # Create JWT token
        access_token_expires = timedelta(minutes=30)
        access_token = create_access_token(
            data={"sub": str(db_user.id), "email": db_user.email},
            expires_delta=access_token_expires
        )

        return ApiResponse(
            success=True,
            data={
                "access_token": access_token,
                "token_type": "bearer",
                "user": {
                    "id": str(db_user.id),
                    "email": db_user.email
                }
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@router.post("/login", response_model=ApiResponse)
async def login_user(request: Request, session: Session = Depends(get_session)):
    """
    Authenticate user and return JWT token
    Expected fields: email, password
    """
    try:
        login_data = await request.json()

        # Find user by email
        statement = select(User).where(User.email == login_data["email"])
        user = session.exec(statement).first()

        if not user or not pwd_context.verify(login_data["password"], user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Create JWT token
        access_token_expires = timedelta(minutes=30)
        access_token = create_access_token(
            data={"sub": str(user.id), "email": user.email},
            expires_delta=access_token_expires
        )

        return ApiResponse(
            success=True,
            data={
                "access_token": access_token,
                "token_type": "bearer",
                "user": {
                    "id": str(user.id),
                    "email": user.email
                }
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@router.get("/me", response_model=ApiResponse)
async def get_current_user_info(request: Request, session: Session = Depends(get_session)):
    """
    Get current user info from JWT token
    """
    try:
        token = get_token_from_header(request)

        # Decode the JWT token
        payload = decode_jwt(token)
        if payload is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )

        user_id = payload.get("sub") or payload.get("user_id") or payload.get("id")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Get user from database
        statement = select(User).where(User.id == user_id)
        user = session.exec(statement).first()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
                headers={"WWW-Authenticate": "Bearer"},
            )

        return ApiResponse(
            success=True,
            data={
                "id": str(user.id),
                "email": user.email
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )