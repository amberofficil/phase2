from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlmodel import Session, select
from database.session import get_session
from auth.jwt_handler import get_current_user
from schemas.task import TaskCreate, TaskUpdate, TaskResponse
from schemas.response import ApiResponse
from models.task import Task, TaskBase
from utils.validators import validate_title, validate_description, validate_status
import uuid

router = APIRouter()

@router.get("/", response_model=ApiResponse)
def get_tasks(current_user: dict = Depends(get_current_user), session: Session = Depends(get_session)):
    """
    Retrieve user's tasks
    Auth Required: JWT token in Authorization header
    User-Scoped Fields: Only returns tasks owned by authenticated user
    """
    try:
        # Query tasks filtered by authenticated user_id from JWT
        statement = select(Task).where(Task.user_id == current_user["user_id"])
        tasks = session.exec(statement).all()

        # Convert to response format
        task_list = [TaskResponse(
            id=task.id,
            title=task.title,
            description=task.description,
            status=task.status,
            user_id=task.user_id,
            created_at=task.created_at,
            updated_at=task.updated_at
        ) for task in tasks]

        return ApiResponse(success=True, data={"tasks": task_list})
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@router.post("/", response_model=ApiResponse)
def create_task(task_data: TaskCreate, current_user: dict = Depends(get_current_user), session: Session = Depends(get_session)):
    """
    Create new task
    Auth Required: JWT token in Authorization header
    Validation: Title required (min 1 char, max 255), description max 1000 chars, status enum validation
    User-Scoped Fields: Task is associated with authenticated user ID
    """
    try:
        # Validate input data
        if not validate_title(task_data.title):
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Title must be between 1 and 255 characters"
            )

        if task_data.description and not validate_description(task_data.description):
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Description must be less than 1000 characters"
            )

        if task_data.status and not validate_status(task_data.status):
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Status must be either 'pending' or 'completed'"
            )

        # Create new task
        db_task = Task(
            title=task_data.title,
            description=task_data.description,
            status=task_data.status,
            user_id=current_user["user_id"]  # Associate with authenticated user
        )

        session.add(db_task)
        session.commit()
        session.refresh(db_task)

        # Return response
        response_task = TaskResponse(
            id=db_task.id,
            title=db_task.title,
            description=db_task.description,
            status=db_task.status,
            user_id=db_task.user_id,
            created_at=db_task.created_at,
            updated_at=db_task.updated_at
        )

        return ApiResponse(success=True, data=response_task)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@router.put("/{task_id}", response_model=ApiResponse)
def update_task(task_id: uuid.UUID, task_data: TaskUpdate, current_user: dict = Depends(get_current_user), session: Session = Depends(get_session)):
    """
    Update existing task
    Auth Required: JWT token in Authorization header
    Validation: Task ownership check, status enum validation
    User-Scoped Fields: Only allows updates to tasks owned by authenticated user
    """
    try:
        # Validate input data if provided
        if task_data.title is not None and not validate_title(task_data.title):
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Title must be between 1 and 255 characters"
            )

        if task_data.description is not None and not validate_description(task_data.description):
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Description must be less than 1000 characters"
            )

        if task_data.status is not None and not validate_status(task_data.status):
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Status must be either 'pending' or 'completed'"
            )

        # Get the task
        statement = select(Task).where(Task.id == task_id)
        db_task = session.exec(statement).first()

        if not db_task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found"
            )

        # Verify ownership
        if str(db_task.user_id) != str(current_user["user_id"]):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found"
            )

        # Update the task
        if task_data.title is not None:
            db_task.title = task_data.title
        if task_data.description is not None:
            db_task.description = task_data.description
        if task_data.status is not None:
            db_task.status = task_data.status

        db_task.updated_at = task_data.__dict__.get('updated_at', db_task.updated_at)

        session.add(db_task)
        session.commit()
        session.refresh(db_task)

        # Return response
        response_task = TaskResponse(
            id=db_task.id,
            title=db_task.title,
            description=db_task.description,
            status=db_task.status,
            user_id=db_task.user_id,
            created_at=db_task.created_at,
            updated_at=db_task.updated_at
        )

        return ApiResponse(success=True, data=response_task)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@router.delete("/{task_id}", response_model=ApiResponse)
def delete_task(task_id: uuid.UUID, current_user: dict = Depends(get_current_user), session: Session = Depends(get_session)):
    """
    Delete task
    Auth Required: JWT token in Authorization header
    Validation: Task ownership check
    User-Scoped Fields: Only allows deletion of tasks owned by authenticated user
    """
    try:
        # Get the task
        statement = select(Task).where(Task.id == task_id)
        db_task = session.exec(statement).first()

        if not db_task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found"
            )

        # Verify ownership
        if str(db_task.user_id) != str(current_user["user_id"]):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found"
            )

        # Delete the task
        session.delete(db_task)
        session.commit()

        return ApiResponse(success=True, data={"message": "Task deleted successfully"})
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )