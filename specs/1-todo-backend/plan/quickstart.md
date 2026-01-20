# Quick Start Guide: Todo Application Backend API

## Prerequisites
- Python 3.10+
- Neon PostgreSQL account
- Better Auth secret key

## Setup Instructions

### 1. Install Dependencies
```bash
pip install fastapi sqlmodel psycopg2-binary python-jose[cryptography] bcrypt python-multipart uvicorn
```

### 2. Environment Configuration
Create a `.env` file with the following variables:
```env
NEON_DB_URL=your_neon_postgres_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=your_frontend_url
```

### 3. Database Models
Create SQLModel models for User and Task entities as specified in the data model.

### 4. Authentication Setup
Implement JWT token validation using the BETTER_AUTH_SECRET and create authentication dependencies.

### 5. API Endpoints
Implement all endpoints as specified in the OpenAPI contract:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/{id}
- DELETE /api/tasks/{id}

## Running the Application
```bash
uvicorn main:app --reload --port 8080
```

## Testing the API
1. Register a new user via POST /api/auth/register
2. Login to get JWT token via POST /api/auth/login
3. Use the JWT token in Authorization header for protected endpoints
4. Test task CRUD operations

## Key Features
- JWT-based authentication with Better Auth compatibility
- User data isolation ensuring users can only access their own tasks
- Proper error handling with HTTPException
- Pydantic model validation for all requests/responses
- Neon PostgreSQL integration with proper indexing