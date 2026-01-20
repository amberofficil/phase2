// Mock authentication functions - these will need to be replaced with actual Better Auth integration

interface User {
  id: string;
  email: string;
}

// Mock API calls - these should be replaced with actual API calls to backend
const mockUsers: User[] = [];
let mockCurrentUser: User | null = null;

export async function signIn(email: string, password: string): Promise<User | null> {
  // In a real implementation, this would call the backend authentication API
  // For now, we'll simulate a successful login for any valid email/password combination

  // Find user in mock database
  const user = mockUsers.find(u => u.email === email);

  if (user) {
    mockCurrentUser = user;
    return user;
  }

  // If user doesn't exist, return null
  return null;
}

export async function signUp(email: string, password: string): Promise<User | null> {
  // In a real implementation, this would call the backend registration API
  // For now, we'll simulate a successful registration

  // Check if user already exists
  const existingUser = mockUsers.find(u => u.email === email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Create new user
  const newUser: User = {
    id: `user_${Date.now()}`,
    email,
  };

  mockUsers.push(newUser);
  mockCurrentUser = newUser;

  return newUser;
}

export async function signOut(): Promise<void> {
  // In a real implementation, this would call the backend logout API
  mockCurrentUser = null;
}

export async function getCurrentUser(): Promise<User | null> {
  // In a real implementation, this would validate the JWT token with the backend
  return mockCurrentUser;
}

// Function to attach auth headers to API requests
export function getAuthHeaders(): Record<string, string> {
  // In a real implementation, this would return the JWT token
  return {};
}