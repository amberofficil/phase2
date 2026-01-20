# Todo Application Backend API

Backend API for the Todo Application with JWT authentication and user data isolation.

## Technology Stack

- Python 3.11+
- FastAPI
- SQLModel
- Neon Serverless PostgreSQL
- JWT Authentication (verified with Better Auth secret)

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your actual configuration
   ```

4. Start the development server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

## API Endpoints

All endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Task Management
- `GET /api/tasks` - Retrieve authenticated user's tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update an existing task
- `DELETE /api/tasks/{id}` - Delete a task

## Response Format

All API responses follow the format:
```json
{
  "success": true,
  "data": { /* response data */ },
  "error": null
}
```

For errors:
```json
{
  "success": false,
  "data": null,
  "error": "Error message"
}
```

## Security Features

- JWT token verification using BETTER_AUTH_SECRET
- User data isolation - users can only access their own tasks
- Input validation using Pydantic schemas
- Proper error handling with appropriate HTTP status codes