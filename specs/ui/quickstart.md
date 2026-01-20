# Quickstart Guide: Frontend Development for Todo Application

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git version control system
- Code editor (VS Code recommended)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone [repository-url]
cd [repository-directory]
```

### 2. Navigate to Frontend Directory
```bash
cd frontend
```

### 3. Install Dependencies
```bash
npm install
# or
yarn install
```

### 4. Environment Configuration
Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### 5. Run Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:3000

## Key Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
```

### Building
```bash
npm run build        # Build the application for production
npm run start        # Start production server
```

### Testing
```bash
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run lint         # Check code for linting errors
npm run lint:fix     # Automatically fix linting errors
```

## Project Structure
```
frontend/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── login/              # Login page
│   │   └── page.tsx
│   ├── signup/             # Signup page
│   │   └── page.tsx
│   └── dashboard/          # Protected dashboard
│       └── page.tsx
├── components/            # Reusable UI components
│   ├── ui/                # Base UI primitives
│   ├── auth/              # Authentication components
│   └── dashboard/         # Dashboard components
├── lib/                  # Utility functions and API clients
│   ├── api.ts            # API client implementation
│   └── auth.ts           # Authentication utilities
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── public/               # Static assets
└── styles/               # Global styles
```

## Development Workflow

### 1. Create New Components
- Add reusable components to `components/ui/`
- Add feature-specific components to appropriate subdirectories
- Use TypeScript interfaces for props and state

### 2. Add New Pages
- Create new pages in the `app/` directory following App Router conventions
- Use Server Components by default, Client Components only when interactivity is needed
- Implement proper loading and error boundaries

### 3. Connect to APIs
- Use the API client in `lib/api.ts` for all backend communications
- Implement proper error handling and loading states
- Follow the authentication patterns established in the codebase

### 4. Styling Guidelines
- Use Tailwind CSS utility classes
- Follow the design system established in the project
- Create reusable component styles where appropriate

## Authentication Flow
1. Unauthenticated users are redirected to `/login`
2. Successful login redirects to `/dashboard`
3. All dashboard routes are protected by authentication middleware
4. JWT tokens are stored securely and attached to API requests

## Common Tasks

### Add a New Task Feature
1. Create the UI component in `components/dashboard/`
2. Implement state management using React hooks
3. Connect to the backend API using the client in `lib/api.ts`
4. Add proper loading and error states

### Modify Existing UI
1. Locate the relevant component in the `components/` directory
2. Update the JSX and Tailwind classes as needed
3. Ensure responsive design across device sizes
4. Test accessibility features

### Add Form Validation
1. Use the validation patterns established in authentication forms
2. Implement both client-side and server-side validation
3. Provide clear error messages to users
4. Ensure proper focus management after validation errors

## Troubleshooting

### Common Issues
- **Authentication not working**: Verify that `BETTER_AUTH_SECRET` is set correctly
- **API calls failing**: Check that the backend server is running and the API URL is correct
- **Styles not applying**: Ensure Tailwind is properly configured and classes are spelled correctly

### Development Tips
- Use the browser's developer tools to inspect components and debug issues
- Check the console for error messages during development
- Use React Developer Tools browser extension for debugging component state