// API client for connecting to backend services

import { getAuthHeaders } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Generic request function
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options.headers,
    },
  };

  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      const errorData = await response.text();
      return {
        success: false,
        error: errorData || `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// Authentication API functions
export const authApi = {
  async login(email: string, password: string) {
    return request<{ token: string; user: { id: string; email: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async register(email: string, password: string) {
    return request<{ token: string; user: { id: string; email: string } }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async logout() {
    return request('/auth/logout', {
      method: 'POST',
    });
  },
};

// Task API functions
export const taskApi = {
  async getAll() {
    return request<{ tasks: Array<{ id: string; title: string; description?: string; status: 'pending' | 'completed'; createdAt: string; updatedAt: string }> }>('/tasks');
  },

  async create(title: string, description?: string) {
    return request<{ task: { id: string; title: string; description?: string; status: 'pending'; createdAt: string; updatedAt: string } }>('/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, description, status: 'pending' }),
    });
  },

  async update(id: string, updates: { title?: string; description?: string; status?: 'pending' | 'completed' }) {
    return request<{ task: { id: string; title: string; description?: string; status: 'pending' | 'completed'; createdAt: string; updatedAt: string } }>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async delete(id: string) {
    return request(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};