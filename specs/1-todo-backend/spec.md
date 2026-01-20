# Feature Specification: Todo Application Backend API

**Feature Branch**: `1-todo-backend`
**Created**: 2026-01-18
**Status**: Draft
**Input**: User description: "You are Claude Code working inside a Spec-Kit–managed monorepo for Hackathon II.

Project: Phase II – Todo Full-Stack Web Application

Your task is to write a COMPLETE, AUTHORITATIVE specification for the /backend,
strictly following spec-driven development principles.

⚠️ Do NOT guess or invent any behavior.
⚠️ No implementation is allowed without a specification.
⚠️ This specification will be the single source of truth for backend implementation.

--------------------------------------------------
FOLLOW THIS CONSTITUTION STRICTLY
--------------------------------------------------

- Feature behavior: @specs/features/
- API contracts: @specs/api/rest-endpoints.md
- Database schema: @specs/database/schema.md
- UI behavior: @specs/ui/
- Architecture & overview: @specs/overview.md

If any requirement is unclear or missing:
- STOP
- Ask for clarification or a spec update
- Do NOT invent behavior

--------------------------------------------------
BACKEND SPECIFICATION GOAL
--------------------------------------------------

Define the complete backend specification for the Phase II Todo Application
using Python FastAPI, fully integrated with the frontend (Next.js + Better Auth).

Backend technology stack:
- FastAPI
- SQLModel
- Neon Serverless PostgreSQL
- JWT Authentication (issued by Better Auth)
- Pydantic schemas

--------------------------------------------------
ENVIRONMENT RULES (MANDATORY)
--------------------------------------------------

Database:
- The database connection string MUST come from the environment variable:
  NEON_DB_URL

Authentication:
- JWT verification MUST use:
  BETTER_AUTH_SECRET
- JWT MUST be received from the frontend via:
  Authorization: Bearer <token>
- BETTER_AUTH_URL is for frontend reference only

--------------------------------------------------
SCOPE OF SPECIFICATION
--------------------------------------------------

### 1. API ENDPOINTS
Follow @specs/api/rest-endpoints.md EXACTLY.

For each endpoint, define:
- HTTP method
- Full path (all routes must be under /api)
- JWT authentication requirement (mandatory)
- Request body schema
- Response body schema
- Success response
- Error responses:
  - 401 Unauthorized
  - 404 Not Found
  - 422 Validation Error
  - 500 Internal Server Error

⚠️ Do NOT rename, modify, add, or remove any endpoints.

--------------------------------------------------
### 2. AUTHENTICATION & AUTHORIZATION
--------------------------------------------------

- The backend MUST NOT handle login or signup
- The backend MUST ONLY verify JWTs
- user_id MUST be extracted from the JWT
- Accepting user_id from request body is STRICTLY forbidden
- Every query MUST be scoped to the authenticated user
- Cross-user data access is strictly prohibited

--------------------------------------------------
### 3. DATABASE SCHEMA
--------------------------------------------------

Follow @specs/database/schema.md EXACTLY.

- Define rules for SQLModel models
- Enforce tasks.user_id = authenticated user
- Specify required indexes
- Explain foreign keys and constraints
- No extra fields are allowed

--------------------------------------------------
### 4. USER DATA ISOLATION (CRITICAL)
--------------------------------------------------

For every endpoint, explicitly specify:
- Which fields are user-scoped
- How user isolation is enforced
- Ownership checks for update and delete operations

--------------------------------------------------
### 5. VALIDATION RULES
--------------------------------------------------

- Use Pydantic schemas for validation
- Define field-level validation rules
- Return 422 for invalid input
- Return 404 for missing resources

--------------------------------------------------
### 6. ERROR HANDLING
--------------------------------------------------

- Use FastAPI HTTPException
- Return correct HTTP status codes
- Do NOT leak sensitive information in responses

--------------------------------------------------
### 7. FRONTEND INTEGRATION CONTRACT
--------------------------------------------------

- Frontend calls from /lib/api.ts"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - User Authentication (Priority: P1)

As an existing user, I want to access my personal todo list through authenticated API endpoints so that I can securely manage my tasks.

**Why this priority**: Authentication is foundational - without it, users cannot have personalized experiences or secure access to their data. The backend must verify JWT tokens issued by Better Auth.

**Independent Test**: Users can access protected API endpoints by providing a valid JWT token in the Authorization header, and the backend successfully verifies the JWT and processes the request.

**Acceptance Scenarios**:

1. **Given** I am an authenticated user with a valid JWT token from Better Auth, **When** I make a request to a protected endpoint with Authorization: Bearer <token>, **Then** the backend verifies the JWT using BETTER_AUTH_SECRET and processes my request
2. **Given** I am an unauthenticated user with an invalid/expired JWT token, **When** I make a request to a protected endpoint, **Then** I receive a 401 Unauthorized response
3. **Given** I am an authenticated user, **When** I make a request without providing an Authorization header, **Then** I receive a 401 Unauthorized response

---

### User Story 2 - Manage Personal Tasks (Priority: P1)

As a logged-in user, I want to create, view, update, and delete my personal tasks so that I can organize and track my activities.

**Why this priority**: This is the core functionality of the todo application - users need to be able to manage their tasks.

**Independent Test**: After authenticating, users can perform CRUD operations on their own tasks through the API endpoints, with proper isolation from other users' tasks.

**Acceptance Scenarios**:

1. **Given** I am a logged-in user, **When** I make a request to create a new task with title and optional description, **Then** the task is created and returned with proper metadata
2. **Given** I am a logged-in user with existing tasks, **When** I request to view my tasks, **Then** I see only my own tasks, not others'
3. **Given** I am a logged-in user with an existing task, **When** I request to update the task, **Then** only my own task is modified
4. **Given** I am a logged-in user with an existing task, **When** I request to delete my task, **Then** only that specific task is removed

---

### User Story 3 - Secure Task Isolation (Priority: P2)

As a security-conscious user, I want to ensure that my tasks remain private and inaccessible to other users, even if they know my task IDs.

**Why this priority**: Security and privacy are critical for user trust - users must be confident their personal data is protected.

**Independent Test**: Users cannot access, modify, or delete tasks belonging to other users, regardless of whether they know the task identifiers.

**Acceptance Scenarios**:

1. **Given** I am a logged-in user, **When** I attempt to access another user's task by ID, **Then** I receive a 404 Not Found or 401 Unauthorized response
2. **Given** I am a logged-in user, **When** I attempt to modify another user's task, **Then** the operation is denied

---

### User Story 4 - Consistent Data Format (Priority: P2)

As a frontend developer, I want consistent API responses in a standardized JSON format so that the existing Next.js frontend can reliably consume the backend services.

**Why this priority**: Ensures seamless integration with the existing frontend without requiring frontend changes.

**Independent Test**: All API endpoints return responses in the expected JSON format with consistent structure and proper HTTP status codes.

**Acceptance Scenarios**:

1. **Given** I make any API request, **When** the request is processed, **Then** the response follows the format {success: boolean, data?: any, error?: string}
2. **Given** I make an API request that results in an error, **When** the error occurs, **Then** the response includes proper error status codes and messages

---

### Edge Cases

- What happens when a user attempts to access an API endpoint without a JWT token?
- How does the system handle invalid JWT tokens in requests to protected endpoints?
- What occurs when a user tries to update a task that doesn't exist?
- How does the system respond when a user submits malformed JSON data?
- What happens when a user attempts to create a task without providing required fields?
- What occurs when the database connection fails during an operation?
- How does the system handle concurrent requests from the same user?
- What happens when a user attempts to access a task ID that exists but belongs to another user?
- How does the system handle requests with expired JWT tokens?
- What occurs when the BETTER_AUTH_SECRET is not configured properly?
- How does the system respond when a request attempts to specify user_id in the request body?
- What happens when a JWT token is malformed or tampered with?
- How does the system handle cases where the user_id in the JWT doesn't correspond to a record in the database?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST verify JWT tokens using BETTER_AUTH_SECRET from Better Auth for all protected endpoints
- **FR-002**: System MUST extract user_id from JWT tokens for user-specific data access
- **FR-003**: System MUST NOT handle user registration or login (these are managed by Better Auth)
- **FR-004**: System MUST allow authenticated users to create new tasks with title, optional description, and status
- **FR-005**: System MUST allow authenticated users to retrieve their own tasks only
- **FR-006**: System MUST allow authenticated users to update their own tasks (title, description, status)
- **FR-007**: System MUST allow authenticated users to delete their own tasks
- **FR-008**: System MUST ensure task isolation - users cannot access other users' tasks
- **FR-009**: System MUST validate JWT tokens on protected endpoints and reject unauthorized requests
- **FR-010**: System MUST return API responses in the format {success: boolean, data?: any, error?: string}
- **FR-011**: System MUST use proper HTTP status codes (200, 201, 401, 404, 422, 500) for different scenarios
- **FR-012**: System MUST validate input data using Pydantic models before processing requests
- **FR-013**: System MUST integrate with Neon PostgreSQL database for data persistence
- **FR-014**: System MUST extract and verify JWT tokens using Better Auth secret for all protected endpoints
- **FR-015**: System MUST enforce user ownership on all task operations - users can only access their own tasks
- **FR-016**: System MUST handle all API requests with proper error handling using HTTPException
- **FR-017**: System MUST validate request bodies using Pydantic models with appropriate validation rules
- **FR-018**: System MUST return appropriate error responses: 401 for unauthorized, 404 for not found, 422 for validation errors, 500 for server errors
- **FR-019**: System MUST implement indexing on user_id and task_id fields for query optimization
- **FR-020**: System MUST ensure all user-scoped fields (tasks, user data) are properly isolated by user ID
- **FR-021**: System MUST accept user_id only from JWT tokens, NEVER from request body or query parameters
- **FR-022**: System MUST reject any requests that attempt to specify user_id in request body

### API Endpoints Specification

**Task Management Endpoints**:
- GET `/api/tasks`: Retrieve user's tasks
  - Request Body: None
  - Response: {success: boolean, data: {tasks: Array<Task>}}
  - Auth Required: JWT token in Authorization header
  - Validation: JWT token validity
  - Error Responses: 401 (unauthorized), 500 (server error)
  - User-Scoped Fields: Only returns tasks owned by authenticated user

- POST `/api/tasks`: Create new task
  - Request Body: {title: string, description?: string, status?: 'pending'|'completed'} - validated with Pydantic model
  - Response: {success: boolean, data: Task}
  - Auth Required: JWT token in Authorization header
  - Validation: Title required (min 1 char, max 255), description max 1000 chars, status enum validation
  - Error Responses: 401 (unauthorized), 422 (validation error), 500 (server error)
  - User-Scoped Fields: Task is associated with authenticated user ID

- PUT `/api/tasks/{id}`: Update existing task
  - Request Body: {title?: string, description?: string, status?: 'pending'|'completed'} - validated with Pydantic model
  - Response: {success: boolean, data: Task}
  - Auth Required: JWT token in Authorization header
  - Validation: Task ownership check, status enum validation
  - Error Responses: 401 (unauthorized), 404 (task not found), 422 (validation error), 500 (server error)
  - User-Scoped Fields: Only allows updates to tasks owned by authenticated user

- DELETE `/api/tasks/{id}`: Delete task
  - Request Body: None
  - Response: {success: boolean, data: {message: string}}
  - Auth Required: JWT token in Authorization header
  - Validation: Task ownership check
  - Error Responses: 401 (unauthorized), 404 (task not found), 500 (server error)
  - User-Scoped Fields: Only allows deletion of tasks owned by authenticated user

### Database Schema Specification

**User Table**:
- id: UUID (Primary Key) - unique identifier for user
- email: VARCHAR(255) (Unique, Not Null) - user's email address
- password_hash: TEXT (Not Null) - bcrypt hash of user's password
- created_at: TIMESTAMP (Not Null, Default: NOW()) - account creation timestamp
- updated_at: TIMESTAMP (Not Null, Default: NOW()) - last update timestamp

**Task Table**:
- id: UUID (Primary Key) - unique identifier for task
- title: VARCHAR(255) (Not Null) - task title
- description: TEXT (Nullable) - optional task description
- status: VARCHAR(20) (Not Null, Default: 'pending') - task status ('pending' or 'completed')
- user_id: UUID (Foreign Key -> users.id, Not Null) - reference to owning user
- created_at: TIMESTAMP (Not Null, Default: NOW()) - task creation timestamp
- updated_at: TIMESTAMP (Not Null, Default: NOW()) - last update timestamp

**Database Indexes**:
- Index on user_id in tasks table for optimized user-specific queries
- Index on created_at in tasks table for time-based sorting
- Unique constraint on email in users table

### Key Entities *(include if feature involves data)*

- **User**: Represents a registered user with identity managed by Better Auth. User data is isolated by user ID to ensure privacy.
- **Task**: Represents a todo item with title, optional description, status (pending/completed), user association, and timestamps. Tasks are user-scoped and can only be accessed by their owner.
- **JWT Token**: Represents a signed token issued by Better Auth that authenticates the user for protected API endpoints. Token verification uses BETTER_AUTH_SECRET environment variable.
- **Pydantic Models**: Defines request/response schemas for API validation including TaskCreate, TaskUpdate, and ApiResponse models.

### Authentication and Authorization Rules

- JWT extraction and verification process for each protected route:
  1. Extract JWT token from Authorization header (Bearer token)
  2. Verify token signature using BETTER_AUTH_SECRET
  3. Decode token to extract user ID
  4. Attach user context to request for downstream processing
- User data isolation enforced at database query level - all queries filter by user_id from JWT
- Protected endpoints reject requests without valid JWT tokens
- All user-scoped operations validate ownership using user_id from JWT before allowing access
- The backend MUST NOT handle user registration or login (these are managed by Better Auth)
- The backend MUST NOT accept user_id from request body or query parameters

### Error Handling Requirements

- All API endpoints MUST use HTTPException for proper error responses
- Standardized error response format: {success: boolean, error: string}
- Proper HTTP status codes: 401 for authentication failures, 404 for resource not found, 422 for validation errors, 500 for server errors
- All request bodies MUST be validated using Pydantic models with appropriate validation rules

### Environment Variables Integration

- NEON_DB_URL: PostgreSQL connection string for Neon database integration
- BETTER_AUTH_SECRET: Secret key for JWT token verification
- BETTER_AUTH_URL: Frontend URL for integration and redirect purposes

### Frontend Integration Requirements

- All API endpoints MUST match the expected structure in /lib/api.ts
- Response format MUST follow {success: boolean, data?: any, error?: string} pattern
- Endpoint paths MUST align with frontend API client expectations

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can register and authenticate successfully with valid credentials in under 3 seconds
- **SC-002**: Authenticated users can perform CRUD operations on their tasks with API response times under 1 second
- **SC-003**: 100% of requests to protected endpoints with invalid/missing tokens are properly rejected with 401 status
- **SC-004**: 100% of requests to access other users' tasks are properly rejected with appropriate error responses
- **SC-005**: Frontend application successfully integrates with all backend API endpoints without requiring changes to expected data structures
- **SC-006**: All API endpoints return responses in the specified JSON format 100% of the time
- **SC-007**: System handles concurrent user requests without data leakage between user accounts
- **SC-008**: Database queries execute efficiently with proper indexing (sub-second response times for typical operations)
- **SC-009**: 100% of API requests properly validate JWT tokens and enforce user data isolation
- **SC-010**: All Pydantic model validations work correctly, returning 422 status for invalid request data