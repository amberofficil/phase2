---
id: 1
title: "todo-backend-spec"
stage: "spec"
date_iso: "2026-01-18"
surface: "agent"
model: "Claude Sonnet 4.5"
feature: "todo-backend"
branch: "1-todo-backend"
user: "amber"
command: "sp.specify"
labels: ["specification", "backend", "todo-app", "api"]
links:
  spec: "specs/1-todo-backend/spec.md"
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - specs/1-todo-backend/spec.md
  - specs/1-todo-backend/checklists/requirements.md
tests_yaml: |
  - "Manual validation of spec completeness"
  - "Checklist verification completed"
prompt_text: |
  sp.specify "Define and generate a complete Backend API for a Todo Application that integrates seamlessly with an existing Next.js frontend"

  Goal
  Build a production-ready backend for a Todo application that fully integrates with an already implemented Next.js frontend. The backend must support authentication, authorization, and full CRUD functionality for tasks. The frontend is already completed and expects REST APIs with JSON responses.

  Tech Stack (MANDATORY)
  - Runtime: Node.js (latest LTS)
  - Framework: Express.js
  - Database: PostgreSQL (Neon)
  - ORM: Prisma
  - Authentication: Better Auth (JWT-based)
  - Validation: Zod
  - Password hashing: bcrypt
  - Environment variables via dotenv

  Environment Variables (already provided)
  - NEON_DB_URL=<use provided PostgreSQL connection string>
  - BETTER_AUTH_SECRET=<use provided secret>
  - BETTER_AUTH_URL=http://172.24.32.1:3000

  Project Structure (REQUIRED)
  backend/
   ├─ src/
   │  ├─ app.ts
   │  ├─ server.ts
   │  ├─ config/
   │  │   └─ env.ts
   │  ├─ db/
   │  │   └─ prisma.ts
   │  ├─ auth/
   │  │   ├─ auth.controller.ts
   │  │   ├─ auth.routes.ts
   │  │   └─ auth.middleware.ts
   │  ├─ users/
   │  │   └─ user.model.ts
   │  ├─ tasks/
   │  │   ├─ task.model.ts
   │  │   ├─ task.controller.ts
   │  │   ├─ task.routes.ts
   │  │   └─ task.schema.ts
   │  ├─ middlewares/
   │  │   └─ error.middleware.ts
   │  └─ utils/
   │      └─ response.ts
   ├─ prisma/
   │  └─ schema.prisma
   ├─ .env.example
   └─ package.json

  Database Schema (Prisma)
  User:
  - id (UUID, primary key)
  - email (unique)
  - password
  - createdAt

  Task:
  - id (UUID, primary key)
  - title
  - description (optional)
  - status ('pending' | 'completed')
  - userId (foreign key)
  - createdAt
  - updatedAt

  Relationships
  - One User → Many Tasks
  - Tasks must be isolated per user (user A cannot access user B tasks)

  Authentication Requirements
  - POST /api/auth/register
  - POST /api/auth/login
  - JWT token returned on login
  - Protected routes must require Authorization: Bearer <token>
  - Middleware to extract and validate user from JWT

  Task API Endpoints (STRICT)
  - GET    /api/tasks        → get logged-in user's tasks
  - POST   /api/tasks        → create new task
  - PUT    /api/tasks/:id    → update task (title, description, status)
  - DELETE /api/tasks/:id    → delete task

  Behavior Rules
  - All task routes MUST be protected
  - Tasks must belong to authenticated user
  - Return proper HTTP status codes
  - Return JSON in format:
    {
      success: boolean,
      data?: any,
      error?: string
    }

  Frontend Integration Constraints
  - Backend must match existing frontend expectations:
    - Task object shape:
      {
        id,
        title,
        description?,
        status,
        createdAt,
        updatedAt
      }
  - CORS must allow frontend origin
  - API base path must be `/api`

  Error Handling
  - Centralized error middleware
  - Validation errors (400)
  - Auth errors (401)
  - Not found (404)
  - Server errors (500)

  Deliverables
  - Fu
response_text: |
  Created complete specification for Todo Application Backend API (specs/1-todo-backend/spec.md) with user scenarios, functional requirements, and success criteria. Established feature branch 1-todo-backend and validated specification quality against requirements checklist.
outcome: |
  Successfully created comprehensive specification for the Todo Application Backend API that covers authentication, task management, security requirements, and integration with existing frontend. The spec includes user stories, functional requirements, and measurable success criteria. Ready for planning phase (/sp.plan).
evaluation: |
  The specification successfully captures all key requirements from the user description including authentication, CRUD functionality for tasks, security isolation between users, and API integration with existing frontend. All mandatory sections are completed with testable requirements and measurable outcomes.
---