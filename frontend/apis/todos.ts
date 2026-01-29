// frontend/apis/todos.ts
'use client';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://amberofficial-todo.hf.space/api';

// ✅ Optional: Authorization header agar JWT token use kar rahe ho
function authHeaders() {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : null;

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// Get all tasks
export const fetchTasks = async () => {
  const res = await fetch(`${API_URL}/tasks/`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to fetch tasks');
  const data = await res.json();
  return data.data.tasks; // backend response structure
};

// Add task
export const addTask = async (task: { title: string; description?: string }) => {
  const res = await fetch(`${API_URL}/tasks/`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      title: task.title,
      description: task.description ?? '',
      status: 'pending', // default status
    }),
  });
  if (!res.ok) throw new Error('Failed to add task');
  const data = await res.json();
  return data.data.task;
};

// Delete task
export const deleteTask = async (id: string) => {
  const res = await fetch(`${API_URL}/tasks/${id}/`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete task');
  const data = await res.json();
  return data.data;
};

// Update task
export const updateTask = async (id: string, task: { title?: string; description?: string; status?: 'pending' | 'completed' }) => {
  const res = await fetch(`${API_URL}/tasks/${id}/`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to update task');
  const data = await res.json();
  return data.data.task;
};

// Complete task
export const completeTask = async (id: string) => {
  const res = await fetch(`${API_URL}/tasks/${id}/`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ status: 'completed' }),
  });
  if (!res.ok) throw new Error('Failed to complete task');
  const data = await res.json();
  return data.data.task;
};



