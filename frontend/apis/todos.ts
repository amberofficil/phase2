'use client';

const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  'https://amberofficial-todo.hf.space';

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

// GET MY TASKS
export async function getTasks() {
  const res = await fetch(`${API_URL}/tasks/`, {  // ✅ NOTE trailing slash
    method: 'GET',
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch tasks');
  }

  const data = await res.json();
  return data.data.tasks;  // ✅ backend response structure
}

// ADD TASK
export async function addTask(task: any) {
  const res = await fetch(`${API_URL}/tasks/`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(task),
  });

  if (!res.ok) throw new Error('Failed to add task');
  const data = await res.json();
  return data.data;
}

// UPDATE TASK
export async function updateTask(id: string, task: any) {
  const res = await fetch(`${API_URL}/tasks/${id}/`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(task),
  });

  if (!res.ok) throw new Error('Failed to update task');
  const data = await res.json();
  return data.data;
}

// DELETE TASK
export async function deleteTask(id: string) {
  const res = await fetch(`${API_URL}/tasks/${id}/`, {
    method: 'DELETE',
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error('Failed to delete task');
  const data = await res.json();
  return data.data;
}
