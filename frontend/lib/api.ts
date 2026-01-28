import { getAuthHeaders } from "../components/auth/auth";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(), // <-- fixed here
    ...options.headers,
  };

  const mergedOptions: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, mergedOptions);
    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: errorText || `HTTP error! status: ${response.status}` };
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Auth API
export const authApi = {
  login(email: string, password: string) {
    return request<{ token: string; user: { id: string; email: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register(email: string, password: string) {
    return request<{ token: string; user: { id: string; email: string } }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  logout() {
    return request('/auth/logout', { method: 'POST' });
  },
};

// Task API
export const taskApi = {
  getAll() {
    return request<{
      tasks: Array<{
        id: string;
        title: string;
        description?: string;
        status: 'pending' | 'completed';
        createdAt: string;
        updatedAt: string;
      }>;
    }>('/tasks');
  },

  create(title: string, description?: string) {
    return request<{
      task: {
        id: string;
        title: string;
        description?: string;
        status: 'pending';
        createdAt: string;
        updatedAt: string;
      };
    }>('/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, description, status: 'pending' }),
    });
  },

  update(
    id: string,
    updates: { title?: string; description?: string; status?: 'pending' | 'completed' }
  ) {
    return request<{
      task: {
        id: string;
        title: string;
        description?: string;
        status: 'pending' | 'completed';
        createdAt: string;
        updatedAt: string;
      };
    }>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  delete(id: string) {
    return request(`/tasks/${id}`, { method: 'DELETE' });
  },
};
