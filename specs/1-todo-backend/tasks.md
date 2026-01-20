# Tasks: Todo Application Backend API

## Overview

Implementation of a Python FastAPI backend for the Todo Application with JWT authentication and user data isolation. Following the specification and implementation plan, this backend will use SQLModel ORM with Neon PostgreSQL and integrate with Better Auth for JWT token verification.

## Implementation Strategy

- Start with project setup and foundational components
- Implement database layer with proper models and relationships
- Build authentication and security layer
- Create task management API endpoints
- Implement validation and error handling
- Add testing and verification

MVP scope: User Story 1 (User Authentication) and User Story 2 (Manage Personal Tasks) to provide a functional backend that can handle authenticated task operations.

## Phase 1: Setup

### Goal
Initialize the project structure and set up basic configuration for the FastAPI application.

- [x] T001 Create backend directory structure with subdirectories: config, database, models, schemas, auth, routes, utils
- [x] T002 Create requirements.txt with dependencies: fastapi, uvicorn, sqlmodel, psycopg2-binary, python-jose[cryptography], python-dotenv, pydantic
- [x] T003 Create .env.example with required variables: NEON_DB_URL, BETTER_AUTH_SECRET
- [x] T004 Create main.py with basic FastAPI app initialization and CORS middleware
- [x] T005 Create config/settings.py for environment variable loading and configuration

## Phase 2: Foundational Components

### Goal
Implement the foundational components that all user stories depend on: database layer, authentication utilities, and base models.

- [x] T006 [P] Create models/base.py with SQLModel base class
- [x] T007 [P] Create database/engine.py with database engine setup using NEON_DB_URL
- [x] T008 [P] Create database/session.py with database session dependency
- [x] T009 Create models/user.py with User model following specification
- [x] T010 Create models/task.py with Task model following specification
- [x] T011 Create auth/jwt_handler.py with JWT verification utility functions
- [x] T012 Create auth/jwt_handler.py with JWT dependency for FastAPI
- [x] T013 Create schemas/response.py with ApiResponse Pydantic model
- [x] T014 Create utils/validators.py with field validation utilities

## Phase 3: User Authentication (US1)

### Goal
Implement JWT authentication functionality so users can access protected API endpoints.

### Independent Test
Users can access protected API endpoints by providing a valid JWT token in the Authorization header, and the backend successfully verifies the JWT and processes the request.

- [x] T015 [US1] Create auth/jwt_handler.py with user_id extraction from JWT
- [x] T016 [US1] Implement 401 response handling for invalid JWT tokens
- [x] T017 [US1] Create authentication dependency that rejects requests without Authorization header
- [x] T018 [US1] Test JWT verification with valid token scenario
- [x] T019 [US1] Test JWT verification with invalid/expired token scenario
- [x] T020 [US1] Test JWT verification with missing token scenario

## Phase 4: Task Management Endpoints (US2)

### Goal
Implement CRUD endpoints for tasks with proper user data isolation.

### Independent Test
After authenticating, users can perform CRUD operations on their own tasks through the API endpoints, with proper isolation from other users' tasks.

- [x] T021 [P] [US2] Create schemas/task.py with TaskCreate Pydantic model
- [x] T022 [P] [US2] Create schemas/task.py with TaskUpdate Pydantic model
- [x] T023 [P] [US2] Create routes/tasks.py with GET /api/tasks endpoint
- [x] T024 [US2] Implement GET /api/tasks to retrieve user's tasks only
- [x] T025 [US2] Create routes/tasks.py with POST /api/tasks endpoint
- [x] T026 [US2] Implement POST /api/tasks to create new task for authenticated user
- [x] T027 [US2] Create routes/tasks.py with PUT /api/tasks/{id} endpoint
- [x] T028 [US2] Implement PUT /api/tasks/{id} to update existing task with ownership check
- [x] T029 [US2] Create routes/tasks.py with DELETE /api/tasks/{id} endpoint
- [x] T030 [US2] Implement DELETE /api/tasks/{id} to delete task with ownership check
- [x] T031 [US2] Add proper HTTP status codes (200, 201, 401, 404, 422, 500) to all endpoints
- [x] T032 [US2] Add consistent response format {success: boolean, data?: any, error?: string} to all endpoints

## Phase 5: Validation & Error Handling (US2)

### Goal
Implement proper validation and error handling for all endpoints.

- [x] T033 [P] Implement field-level validation for title (min 1 char, max 255)
- [x] T034 [P] Implement field-level validation for description (max 1000 chars)
- [x] T035 Implement field-level validation for status enum ('pending' or 'completed')
- [x] T036 Implement proper HTTPException usage for all error scenarios
- [x] T037 Implement 422 error responses for validation errors
- [x] T038 Implement 404 error responses for non-existent resources
- [x] T039 Implement 401 error responses for unauthorized requests
- [x] T040 Add input validation using Pydantic models to all endpoints

## Phase 6: User Data Isolation (US3)

### Goal
Ensure that users cannot access other users' tasks, even if they know the task IDs.

### Independent Test
Users cannot access, modify, or delete tasks belonging to other users, regardless of whether they know the task identifiers.

- [x] T041 [P] [US3] Add user_id filter to GET /api/tasks query
- [x] T042 [US3] Add ownership verification to PUT /api/tasks/{id} endpoint
- [x] T043 [US3] Add ownership verification to DELETE /api/tasks/{id} endpoint
- [x] T044 [US3] Test cross-user data access prevention
- [x] T045 [US3] Test that users can only access their own tasks
- [x] T046 [US3] Test ownership validation on update/delete operations

## Phase 7: Frontend Integration (US4)

### Goal
Ensure backend endpoints match frontend expectations and maintain consistent data format.

### Independent Test
All API endpoints return responses in the expected JSON format with consistent structure and proper HTTP status codes.

- [x] T047 [P] [US4] Verify endpoint paths match frontend expectations
- [x] T048 [US4] Confirm request/response formats align with frontend
- [x] T049 [US4] Test Authorization header usage compatibility
- [x] T050 [US4] Validate consistent response format {success: boolean, data?: any, error?: string}
- [x] T051 [US4] Test all endpoints return proper HTTP status codes

## Phase 8: Testing & Verification

### Goal
Implement comprehensive testing to verify all functionality works as expected.

- [x] T052 [P] Create test_main.py with basic API tests
- [x] T053 [P] Create test_auth.py with JWT authentication tests
- [x] T054 [P] Create tests/unit/test_tasks.py with task endpoint tests
- [x] T055 Create tests/integration/test_api.py with integration tests
- [x] T056 Create tests/contract/test_endpoints.py with contract verification tests
- [x] T057 Test valid token scenarios
- [x] T058 Test invalid token scenarios
- [x] T059 Test expired token handling
- [x] T060 Test missing token scenarios
- [x] T061 Test user isolation (cross-user access prevention)
- [x] T062 Test ownership validation on update/delete
- [x] T063 Run all tests and verify they pass

## Phase 9: Polish & Cross-Cutting Concerns

### Goal
Add final touches and cross-cutting concerns to complete the implementation.

- [x] T064 Add proper logging throughout the application
- [x] T065 Add health check endpoint
- [x] T066 Add database connection validation at startup
- [x] T067 Add environment variable validation at startup
- [x] T068 Add documentation for API endpoints (README.md)
- [x] T069 Add input sanitization where needed
- [x] T070 Perform final testing of complete workflow
- [x] T071 Update README with deployment instructions

## Dependencies

### User Story Completion Order
1. User Authentication (US1) - Foundation for all other stories
2. Task Management (US2) - Depends on authentication
3. User Data Isolation (US3) - Depends on task management
4. Frontend Integration (US4) - Can be done in parallel with other stories

### Blocking Dependencies
- Phase 1 (Setup) must complete before any other phases
- Phase 2 (Foundational) must complete before user stories
- US1 (Authentication) must complete before US2 (Task Management)

## Parallel Execution Examples

### Per User Story 2 (Task Management):
- T021-T022 (schemas) can run in parallel [P]
- T023, T025, T027, T029 (route creation) can run in parallel [P]

### Per User Story 4 (Frontend Integration):
- T047-T051 can run in parallel [P]

### Per Testing Phase:
- T052-T053 (test file creation) can run in parallel [P]
- T057-T063 (individual tests) can run in parallel [P]

## Test Scenarios

### Unit Tests
- JWT token validation
- Database model validation
- Request/response schema validation
- Authentication middleware

### Integration Tests
- End-to-end API flows
- Database operations
- Authentication + task operations
- Error handling scenarios

### Contract Tests
- API endpoint compliance with specification
- Response format consistency
- Status code correctness