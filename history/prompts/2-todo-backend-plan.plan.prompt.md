---
id: 2
title: "todo-backend-plan"
stage: "plan"
date_iso: "2026-01-18"
surface: "agent"
model: "Claude Sonnet 4.5"
feature: "todo-backend"
branch: "1-todo-backend"
user: "amber"
command: "sp.plan"
labels: ["planning", "backend", "todo-app", "api", "architecture"]
links:
  spec: "specs/1-todo-backend/spec.md"
  plan: "specs/1-todo-backend/plan.md"
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - specs/1-todo-backend/plan.md
  - specs/1-todo-backend/research.md
  - specs/1-todo-backend/data-model.md
  - specs/1-todo-backend/quickstart.md
  - specs/1-todo-backend/contracts/openapi.yaml
tests_yaml: |
  - "API contract validation completed"
  - "Data model alignment with requirements verified"
  - "Quickstart instructions tested for completeness"
prompt_text: |
  sp.plan "Execute, validate, and integrate the Todo Backend with an existing Next.js frontend"

  Objective
  Create a clear, step-by-step execution plan to set up, run, test, and integrate the already-generated backend with the existing frontend Todo application. The plan must minimize risk, ensure correctness, and maintain frontend stability during integration.

  Assumptions
  - Backend source code already exists from sp.specify
  - Frontend is fully implemented and currently uses mock task logic
  - PostgreSQL database is hosted on Neon
  - Environment variables are already available

  Phase 1: Backend Environment Setup
  1. Verify Node.js version (LTS)
  2. Install backend dependencies using npm
  3. Validate `.env` file variables:
     - NEON_DB_URL
     - BETTER_AUTH_SECRET
     - BETTER_AUTH_URL
  4. Ensure dotenv loads env variables correctly at runtime

  Phase 2: Database & Prisma Setup
  1. Validate Prisma schema for User and Task models
  2. Initialize Prisma client
  3. Run Prisma migration against Neon database
  4. Confirm tables created successfully
  5. Run Prisma Studio to visually verify data models

  Phase 3: Backend Server Validation
  1. Start backend server in development mode
  2. Verify server boot logs (no crashes, no missing env errors)
  3. Verify API base path `/api` is reachable
  4. Test health of server via browser or curl

  Phase 4: Authentication Flow Testing
  1. Test `POST /api/auth/register`
     - New user registers successfully
     - Duplicate email throws error
  2. Test `POST /api/auth/login`
     - Correct credentials return JWT
     - Wrong credentials return 401
  3. Verify JWT payload includes userId
  4. Verify auth middleware correctly blocks protected routes

  Phase 5: Task API Testing (Isolated)
  1. Test `GET /api/tasks` with valid JWT
  2. Test `POST /api/tasks` to create a task
  3. Test `PUT /api/tasks/:id` to update title/status
  4. Test `DELETE /api/tasks/:id`
  5. Confirm user isolation:
     - User A cannot access User B tasks

  Phase 6: Frontend Integration Preparation
  1. Identify mock task logic in frontend dashboard page
  2. Create API utility functions for tasks and auth
  3. Configure API base URL for backend
  4. Add Authorization header using stored JWT

  Phase 7: Frontend → Backend Integration
  1. Replace mock task creation with POST /api/tasks
  2. Replace task fetching with GET /api/tasks
  3. Replace update logic with PUT /api/tasks/:id
  4. Replace delete logic with DELETE /api/tasks/:id
  5. Ensure UI state updates reflect API responses

  Phase 8: Error Handling & UX Validation
  1. Validate error messages from backend show correctly in UI
  2. Handle loading states during API calls
  3. Handle auth expiration gracefully (logout + redirect)
  4. Ensure no UI regression on sign-in / sign-up pages

  Phase 9: Security & Production Readiness
  1. Ensure passwords are hashed
  2. Ensure JWT secret is never logged
  3. Validate CORS configuration
  4. Validate rate limiting (if implemented)
  5. Confirm no sensitive data exposed in responses

  Phase 10: Final Verification Checklist
  1. Signup → Login → Dashboard works end-to-end
  2. Tasks add/edit/delete/complete
response_text: |
  Completed comprehensive planning for Todo Backend API implementation. Created:
  - Implementation plan (plan.md) outlining technical approach
  - Research documentation (research.md) covering technology stack
  - Data model specification (data-model.md) defining entities and relationships
  - Quickstart guide (quickstart.md) with setup instructions
  - API contracts (openapi.yaml) specifying endpoints and schemas

  All artifacts align with the original specification requirements and constitutional principles. The plan addresses authentication, task management, security, and frontend integration requirements.
outcome: |
  Successfully created complete planning artifacts for the Todo Backend API feature. The implementation plan provides clear technical direction, data models, API contracts, and setup instructions. Ready for task breakdown phase (/sp.tasks).
evaluation: |
  The planning phase successfully produced all required artifacts: implementation plan, research, data model, quickstart guide, and API contracts. All constitutional requirements were considered, particularly authentication enforcement and data isolation. The API contracts match the specified requirements from the feature spec.
---