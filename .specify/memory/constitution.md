<!--
Sync Impact Report:
- Version change: N/A → 1.0.0
- Modified principles: N/A (new constitution)
- Added sections: All principles and sections
- Removed sections: N/A
- Templates requiring updates: N/A
- Follow-up TODOs: None
-->
# Hackathon II Todo Full-Stack Web Application Constitution


## Core Principles

### Spec-Driven Development
Always read specs before coding. Feature behavior follows @specs/features/, API contracts follow @specs/api/, Database schema follows @specs/database/, UI behavior follows @specs/ui/, Architecture follows @specs/overview.md. If requirements are unclear or missing, stop and ask to update or clarify the spec first. Do not guess or invent behavior. Specs are the source of truth.

### Monorepo Architecture Compliance
Follow the monorepo structure with /frontend → Next.js 16+ App Router (TypeScript, Tailwind CSS), /backend → Python FastAPI (SQLModel, Neon PostgreSQL), /specs → All specifications, /.spec-kit → Spec-Kit configuration. All code must align with this architecture.

### Authentication Enforcement (NON-NEGOTIABLE)
All routes must require JWT authentication. JWT must be validated using BETTER_AUTH_SECRET. User identity must be extracted from JWT, not from request body. Every query MUST be filtered by authenticated user ID. Never return data belonging to another user.

### Frontend Best Practices
Use Next.js 16+ with App Router. Use Server Components by default. Use Client Components only when interactivity is required. No React Router (Next.js routing only). API calls MUST go through `/lib/api.ts`. Authentication handled ONLY by Better Auth. JWT token must be attached to every backend API request.

### Backend Standards
Framework: FastAPI, ORM: SQLModel, Database: Neon Serverless PostgreSQL. All routes must be under `/api`. Use Pydantic models for request/response schemas. Handle errors using HTTPException with proper status codes. Database schema must match @specs/database/schema.md.

### API Contract Adherence
API endpoints must match @specs/api/rest-endpoints.md exactly. HTTP methods, paths, and behavior must not change. Endpoints must be stateless. No session-based authentication. All CRUD operations are user-scoped.


## Security Requirements

Better Auth runs ONLY on the Next.js frontend. Better Auth must issue JWT tokens. Frontend sends JWT in: Authorization: Bearer <token>. Backend verifies JWT signature and expiration. Backend must reject unauthenticated requests with 401. Backend must enforce task ownership on every operation.


## Implementation Workflow

When asked to implement something: 1. Read the relevant spec(s), 2. Confirm understanding of acceptance criteria, 3. Implement backend first (API + DB), 4. Implement frontend integration, 5. Ensure JWT auth is enforced end-to-end, 6. Do not add extra features beyond the spec.


## Governance

Constitution supersedes all other practices. All implementations must verify compliance with spec-driven development. Code must match specs exactly. If code and spec conflict, update the spec before changing code. All PRs/reviews must verify compliance.

**Version**: 1.0.0 | **Ratified**: 2026-01-17 | **Last Amended**: 2026-01-17