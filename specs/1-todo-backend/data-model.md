# Data Model: Todo Backend API

## Entity Definitions

### User Entity
- **id**: UUID (Primary Key)
  - Auto-generated unique identifier
  - Never exposed directly to clients
- **email**: String (Unique)
  - Validated email address format
  - Used for authentication
  - Unique constraint enforced
- **password**: String
  - Bcrypt-hashed password
  - Never stored in plaintext
  - Required field
- **createdAt**: DateTime (Timestamp)
  - Auto-populated on record creation
  - Used for audit trail
  - Immutable after creation

### Task Entity
- **id**: UUID (Primary Key)
  - Auto-generated unique identifier
  - Never exposed directly to clients
- **title**: String
  - Required field
  - Minimum length validation
  - Maximum length validation
- **description**: String (Optional)
  - Nullable field
  - Optional extended task details
  - Maximum length validation
- **status**: Enum ['pending', 'completed']
  - Required field
  - Task completion state
  - Validated enum values only
- **userId**: UUID (Foreign Key)
  - References User entity
  - Establishes ownership relationship
  - Required field for data isolation
- **createdAt**: DateTime (Timestamp)
  - Auto-populated on record creation
  - Used for ordering and audit
  - Immutable after creation
- **updatedAt**: DateTime (Timestamp)
  - Auto-updated on record modification
  - Used for freshness tracking
  - Updated automatically on changes

## Relationship Mappings

### User → Tasks (One-to-Many)
- One User can own many Tasks
- Tasks are always associated with a single User
- Foreign key constraint ensures referential integrity
- Cascade operations not enabled to prevent accidental data loss

### Data Access Patterns
- Users access only their own Tasks via userId filter
- Authentication middleware enforces user context
- Queries automatically filtered by authenticated user ID
- No cross-user data access possible through API

## Validation Rules

### User Validation
- Email format validation using standard email regex
- Password strength validation (minimum 8 characters)
- Email uniqueness constraint at database level
- Required field validation for all mandatory fields

### Task Validation
- Title required with 1-255 character range
- Description optional with 0-1000 character maximum
- Status validation restricted to allowed enum values
- User ID validation ensures existence of referenced User

## Indexing Strategy

### User Table
- Primary key index on `id` (automatically created)
- Unique index on `email` for fast lookups and uniqueness enforcement

### Task Table
- Primary key index on `id` (automatically created)
- Foreign key index on `userId` for efficient user-specific queries
- Composite index on `userId` and `createdAt` for sorted retrieval
- Index on `status` for filtering completed/pending tasks

## State Transitions

### Task Status Transitions
- 'pending' → 'completed' (via PUT /api/tasks/:id)
- 'completed' → 'pending' (via PUT /api/tasks/:id)
- No other status transitions allowed
- Updates trigger updatedAt timestamp refresh

## Audit Trail

### Creation Timestamps
- Both User and Task records include createdAt timestamps
- Immutable after initial creation
- Used for ordering and historical tracking

### Modification Tracking
- Task records include updatedAt timestamps
- Automatically updated on any record modification
- Used for freshness and synchronization purposes