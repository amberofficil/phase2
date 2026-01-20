# Data Model: Frontend UI for Todo Application

## Overview
This document defines the data structures and entities relevant to the frontend UI implementation of the Todo application, derived from the UI specifications in `specs/ui/spec.md`.

## Core Entities

### Task Item
Represents an individual todo item with properties for display and interaction.

**Fields:**
- `id`: string | Unique identifier for the task
- `title`: string | Title/description of the task (required)
- `description`: string | Detailed description of the task (optional)
- `status`: 'pending' | 'completed' | Current completion status of the task
- `createdAt`: Date | Timestamp when the task was created
- `updatedAt`: Date | Timestamp when the task was last updated
- `userId`: string | ID of the user who owns this task (for backend filtering)

**Validation Rules:**
- Title must be 1-200 characters
- Description can be up to 1000 characters
- Status must be one of the allowed values
- createdAt and updatedAt are automatically managed

### Task List
Container for displaying multiple task items with filtering capabilities.

**Fields:**
- `tasks`: Array<TaskItem> | Collection of task items
- `filter`: 'all' | 'pending' | 'completed' | Current filter applied to the list
- `sortOrder`: 'asc' | 'desc' | Sort direction for the list
- `sortBy`: 'date' | 'priority' | 'title' | Field to sort by

### Authentication Form Data
Represents data collected from authentication forms.

**Fields (Login):**
- `email`: string | User's email address (required, valid email format)
- `password`: string | User's password (required, minimum 8 characters)

**Fields (Signup):**
- `email`: string | User's email address (required, valid email format)
- `password`: string | User's password (required, minimum 8 characters)
- `confirmPassword`: string | Password confirmation (required, must match password)

**Validation Rules:**
- Email must be in valid format
- Password must meet minimum length requirements
- confirmPassword must match password field

### User Session
Represents the authenticated user state in the frontend.

**Fields:**
- `isLoggedIn`: boolean | Whether the user is currently authenticated
- `user`: Object | User profile data (id, email, etc.)
- `token`: string | JWT token for API authentication
- `expiresAt`: Date | Expiration timestamp for the token

## UI State Models

### Loading States
Models for representing different loading conditions in the UI.

**Task Loading State:**
- `isLoading`: boolean | Whether tasks are currently being fetched
- `isCreating`: boolean | Whether a task is being created
- `isUpdating`: boolean | Whether a task is being updated
- `isDeleting`: boolean | Whether a task is being deleted

### Error States
Models for representing different error conditions in the UI.

**General Error:**
- `hasError`: boolean | Whether an error occurred
- `errorMessage`: string | Human-readable error message
- `errorType`: string | Category of error (network, validation, etc.)

## Relationships
- Each Task Item belongs to a single User (via userId)
- Task List contains multiple Task Items
- User Session contains authentication state for UI routing

## State Transitions

### Task Status Transitions
- `pending` → `completed` (when user marks task as done)
- `completed` → `pending` (when user marks task as undone)

### Authentication State Transitions
- Anonymous → Authenticating (when user submits login/signup form)
- Authenticating → Authenticated (on successful authentication)
- Authenticating → Error (on authentication failure)
- Authenticated → Anonymous (on logout or session expiry)

## API Response Structures
(As they relate to frontend consumption)

### Task List Response
```typescript
{
  tasks: TaskItem[],
  total: number,
  page?: number,
  totalPages?: number
}
```

### Authentication Response
```typescript
{
  success: boolean,
  token?: string,
  user?: {
    id: string,
    email: string
  },
  error?: string
}
```

## UI-Specific Considerations
- All timestamps should be formatted consistently for display
- Error messages should be user-friendly and localized
- Loading states should provide feedback for all async operations
- Form states should persist temporarily during navigation to prevent data loss