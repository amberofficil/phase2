from typing import Optional
import re

def validate_title(title: str) -> bool:
    """Validate task title length"""
    if not title or len(title) < 1 or len(title) > 255:
        return False
    return True

def validate_description(description: Optional[str]) -> bool:
    """Validate task description length"""
    if description and len(description) > 1000:
        return False
    return True

def validate_status(status: str) -> bool:
    """Validate task status enum"""
    if status not in ['pending', 'completed']:
        return False
    return True

def validate_email(email: str) -> bool:
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None