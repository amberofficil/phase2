# Data Model: Todo Application Backend API

## User Entity
- **Fields**:
  - id: UUID (Primary Key) - unique identifier for user
  - email: VARCHAR(255) (Unique, Not Null) - user's email address
  - password_hash: TEXT (Not Null) - bcrypt hash of user's password
  - created_at: TIMESTAMP (Not Null, Default: NOW()) - account creation timestamp
  - updated_at: TIMESTAMP (Not Null, Default: NOW()) - last update timestamp

- **Validation Rules**:
  - Email must be valid email format
  - Password_hash must be properly hashed with bcrypt
  - Email must be unique across all users

## Task Entity
- **Fields**:
  - id: UUID (Primary Key) - unique identifier for task
  - title: VARCHAR(255) (Not Null) - task title
  - description: TEXT (Nullable) - optional task description
  - status: VARCHAR(20) (Not Null, Default: 'pending') - task status ('pending' or 'completed')
  - user_id: UUID (Foreign Key -> users.id, Not Null) - reference to owning user
  - created_at: TIMESTAMP (Not Null, Default: NOW()) - task creation timestamp
  - updated_at: TIMESTAMP (Not Null, Default: NOW()) - last update timestamp

- **Validation Rules**:
  - Title required (min 1 char, max 255 chars)
  - Description optional (max 1000 chars)
  - Status must be either 'pending' or 'completed'
  - user_id must reference a valid user
  - Tasks can only be accessed by their owner

## Relationships
- **User-Task Relationship**: One-to-Many (One user can have many tasks)
- **Foreign Key Constraint**: tasks.user_id references users.id

## Indexes
- Index on user_id in tasks table for optimized user-specific queries
- Index on created_at in tasks table for time-based sorting
- Unique constraint on email in users table

## State Transitions
- Task status can transition from 'pending' to 'completed' or vice versa
- User information can be updated (except email which remains constant)
- Tasks can be created, updated, or deleted by their owner only