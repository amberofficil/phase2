---
id: 1
title: Update Project Constitution
stage: constitution
date: 2026-01-17
surface: agent
model: Claude Sonnet 4.5
feature: general
branch: master
user: amber
command: /sp.constitution
labels: ["constitution", "governance", "spec-driven-development"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests: []
---

# Update Project Constitution

## Prompt Text

You are Claude Code working inside a Spec-Kit–managed monorepo for Hackathon II.

This project is in **Phase II: Todo Full-Stack Web Application**.

You MUST strictly follow spec-driven development.
Never implement features without reading and referencing the relevant specs.

--------------------------------------------------
CORE RULES
--------------------------------------------------

1. Always read specs before coding
   - Feature behavior: @specs/features/
   - API contracts: @specs/api/
   - Database schema: @specs/database/
   - UI behavior: @specs/ui/
   - Architecture & overview: @specs/overview.md

2. If a requirement is unclear or missing:
   - STOP
   - Ask to update or clarify the spec first
   - Do NOT guess or invent behavior

3. Specs are the source of truth.
   - Code must match specs exactly
   - If code and spec conflict, update the spec before changing code

--------------------------------------------------
PROJECT ARCHITECTURE
--------------------------------------------------

This is a MONOREPO structured as:

- /frontend → Next.js 16+ App Router (TypeScript, Tailwind CSS)
- /backend → Python FastAPI (SQLModel, Neon PostgreSQL)
- /specs → All feature, API, DB, and UI specifications
- /.spec-kit → Spec-Kit configuration
- CLAUDE.md files define rules at root, frontend, and backend levels

--------------------------------------------------
FRONTEND RULES (Next.js)
--------------------------------------------------

- Framework: Next.js 16+ with App Router
- Use Server Components by default
- Use Client Components only when interactivity is required
- No React Router (Next.js routing only)
- API calls MUST go through `/lib/api.ts`
- Authentication handled ONLY by Better Auth
- JWT token must be attached to every backend API request
- UI must be responsive and follow Tailwind CSS patterns
- Never hardcode API URLs or secrets

--------------------------------------------------
BACKEND RULES (FastAPI)
--------------------------------------------------

- Framework: FastAPI
- ORM: SQLModel
- Database: Neon Serverless PostgreSQL
- All routes must be under `/api`
- All routes MUST require JWT authentication
- JWT must be validated using BETTER_AUTH_SECRET
- User identity must be extracted from JWT, not from request body
- Every query MUST be filtered by authenticated user ID
- Never return data belonging to another user
- Use Pydantic models for request/response schemas
- Handle errors using HTTPException with proper status codes

--------------------------------------------------
AUTHENTICATION RULES (Better Auth + JWT)
--------------------------------------------------

- Better Auth runs ONLY on the Next.js frontend
- Better Auth must issue JWT tokens
- Frontend sends JWT in:
  Authorization: Bearer <token>
- Backend verifies JWT signature and expiration
- Backend must reject unauthenticated requests with 401
- Backend must enforce task ownership on every operation

--------------------------------------------------
API CONTRACT RULES
--------------------------------------------------

- API endpoints must match @specs/api/rest-endpoints.md exactly
- HTTP methods, paths, and behavior must not change
- Endpoints must be stateless
- No session-based authentication
- All CRUD operations are user-scoped

--------------------------------------------------
DATABASE RULES
--------------------------------------------------

- Schema must match @specs/database/schema.md
- `tasks.user_id` must always match authenticated user
- Never allow cross-user access
- Use indexes defined in the spec
- Database connection string comes from environment variable

--------------------------------------------------
IMPLEMENTATION WORKFLOW
--------------------------------------------------

When asked to implement something:

1. Read the relevant spec(s)
2. Confirm understanding of acceptance criteria
3. Implement backend first (API + DB)
4. Implement frontend integration
5. Ensure JWT auth is enforced end-to-end
6. Do not add extra features beyond the spec

--------------------------------------------------
ABSOLUTE C

## Response Text

Successfully updated the project constitution with the following core principles:

1. Spec-Driven Development: Always read specs before coding, follow the spec locations, and use specs as the source of truth
2. Monorepo Architecture Compliance: Follow the monorepo structure with specific frontend/backend organization
3. Authentication Enforcement: All routes require JWT authentication, user identity extraction from JWT, and user ID filtering
4. Frontend Best Practices: Next.js 16+ with App Router, Server Components by default, API calls through /lib/api.ts
5. Backend Standards: FastAPI with SQLModel, routes under /api, Pydantic models for schemas
6. API Contract Adherence: Match endpoints exactly to spec, stateless endpoints, user-scoped CRUD operations

Additional sections include Security Requirements for Better Auth and JWT handling, Implementation Workflow steps, and Governance rules.

## Outcome

The constitution file (.specify/memory/constitution.md) has been updated with version 1.0.0, incorporating all the specific requirements from the user input for the Hackathon II Todo Full-Stack Web Application project.

## Evaluation

The constitution now properly reflects the spec-driven development requirements, monorepo architecture, authentication enforcement, frontend and backend standards, and implementation workflow as specified in the user input.