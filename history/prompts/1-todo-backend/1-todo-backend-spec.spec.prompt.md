---
id: 1
title: "todo-backend-spec"
stage: "spec"
date: "2026-01-19"
surface: "agent"
model: "Claude Sonnet 4.5"
feature: "1-todo-backend"
branch: "1-todo-backend"
user: "amber"
command: "/sp.specify"
labels: ["backend", "specification", "todo-app", "fastapi", "jwt-auth"]
links:
  spec: "specs/1-todo-backend/spec.md"
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - specs/1-todo-backend/spec.md
  - specs/1-todo-backend/checklists/requirements.md
tests_yaml: []
---

# Prompt History Record: todo-backend-spec

## Original Prompt

```
You are Claude Code working inside a Spec-Kit–managed monorepo for Hackathon II.

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

- Frontend calls from /lib/api.ts
```

## Response Summary

Updated the existing backend specification for the Todo Application to align with the user's requirements. The key changes made:

1. Modified the user story to focus on JWT verification rather than user registration/login since the backend should only verify JWTs issued by Better Auth
2. Updated functional requirements to reflect that the backend must NOT handle user registration or login (FR-003, FR-021, FR-022)
3. Removed authentication endpoints (register/login) from the API specification since these are handled by Better Auth
4. Updated key entities to reflect that user identity is managed by Better Auth
5. Revised authentication rules to emphasize that user_id comes only from JWT tokens, not request body
6. Expanded edge cases to include scenarios related to JWT handling and user_id validation
7. Created a quality checklist to validate the specification

The specification now correctly reflects that the backend should only verify JWT tokens issued by Better Auth, extract user_id from those tokens, and enforce user data isolation based on that user_id. All API endpoints require JWT authentication, and the backend enforces that users can only access their own data.

## Outcome

Successfully created a comprehensive backend specification that follows spec-driven development principles and adheres to the constraints specified by the user. The specification covers all required aspects: API endpoints, authentication/authorization, database schema, user data isolation, validation rules, error handling, and frontend integration.

## Evaluation

The specification meets all the requirements outlined in the user's input:
- ✅ JWT authentication using Better Auth tokens
- ✅ User data isolation enforced at database level
- ✅ Proper error handling with HTTP status codes
- ✅ Validation using Pydantic schemas
- ✅ All endpoints under /api and requiring JWT authentication
- ✅ User_id only extracted from JWT tokens, never from request body
- ✅ Cross-user data access is prohibited