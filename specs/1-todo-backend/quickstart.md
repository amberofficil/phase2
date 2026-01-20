# Quickstart Guide: Todo Backend API

## Prerequisites

- Python 3.11+
- PostgreSQL database (Neon serverless instance)
- Git for version control

## Environment Setup

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd <project-root>
```

### 2. Create Virtual Environment
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Create a `.env` file in the backend directory with the following variables:

```env
NEON_DB_URL=postgresql://username:password@host:port/database
BETTER_AUTH_SECRET=your_secure_jwt_secret
PORT=8000
```

## Database Setup

### 1. Set up your Neon PostgreSQL database
### 2. The application will handle schema creation via SQLModel migrations
### 3. Ensure your NEON_DB_URL is properly configured in environment variables

## Starting the Server

### 1. Development Mode
```bash
uvicorn main:app --reload --port 8000
```

### 2. Production Mode
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

The server will start on `http://localhost:8000` (or your configured PORT).

## API Endpoints

### Task Management
- `GET /api/tasks` - Retrieve authenticated user's tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

## Authentication

All endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Testing the API

### 1. Create a Task (with JWT token)
```bash
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{"title":"Sample Task","description":"Task description","status":"pending"}'
```

### 2. Retrieve User's Tasks
```bash
curl -X GET http://localhost:8000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Frontend Integration

### 1. API Base URL Configuration
Configure your frontend to point to the backend API:
```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

### 2. Authentication Headers
Include the JWT token in all authenticated requests:
```javascript
const headers = {
  'Authorization': `Bearer ${jwtToken}`,
  'Content-Type': 'application/json'
};
```

## Troubleshooting

### Common Issues
1. **Database Connection**: Verify NEON_DB_URL format and database accessibility
2. **JWT Validation**: Ensure BETTER_AUTH_SECRET matches your Better Auth secret
3. **Environment Variables**: Check that all required environment variables are set
4. **Virtual Environment**: Ensure you've activated the Python virtual environment

### Environment Variables
Ensure all required environment variables are set before starting the server:
- NEON_DB_URL: PostgreSQL connection string
- BETTER_AUTH_SECRET: JWT verification secret from Better Auth

## Next Steps

1. Connect frontend components to backend API
2. Add error handling for API responses
3. Implement loading states for API requests
4. Set up proper logging and monitoring