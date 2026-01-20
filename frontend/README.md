# Todo Application Frontend

This is the frontend for the Todo application built with Next.js 16+, TypeScript, and Tailwind CSS.

## Features

- User authentication (login/signup)
- Task management (create, read, update, delete)
- Task filtering (all, pending, completed)
- Task sorting (by date, title, priority)
- Responsive design
- Accessibility features

## Tech Stack

- Next.js 16+ (App Router)
- TypeScript
- Tailwind CSS
- React

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Environment Variables

Create a `.env.local` file in the root of the frontend directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

## Project Structure

```
frontend/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   ├── login/           # Login page
│   ├── signup/          # Signup page
│   └── dashboard/       # Dashboard page
├── components/          # Reusable UI components
│   ├── ui/              # Base UI primitives
│   ├── auth/            # Authentication components
│   ├── dashboard/       # Dashboard components
│   └── common/          # Common components
├── lib/                 # Utility functions and API clients
├── providers/           # Context providers
└── public/              # Static assets
```

## API Integration

The application communicates with the backend API through the client in `lib/api.ts`. The API endpoints are mocked in the current implementation but designed to be easily replaced with real API calls.