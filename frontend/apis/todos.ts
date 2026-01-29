// frontend/apis/todos.ts
'use client';

const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://amberofficial-todo.hf.space/api'; // ✅ backend base URL

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
export async function fetchTasks() {
  const res = await fetch(`${API_URL}/tasks/`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to fetch tasks');
  const data = await res.json();
  return data.data.tasks;
}

// ADD TASK
export async function addTask(task: { title: string; description?: string }) {
  const res = await fetch(`${API_URL}/tasks/`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ ...task, status: 'pending' }),
  });

  if (!res.ok) throw new Error('Failed to add task');
  const data = await res.json();
  return data.data.task;
}

// UPDATE TASK
export async function updateTask(id: string, task: { title?: string; description?: string; status?: string }) {
  const res = await fetch(`${API_URL}/tasks/${id}/`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(task),
  });

  if (!res.ok) throw new Error('Failed to update task');
  const data = await res.json();
  return data.data.task;
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

// TOGGLE COMPLETE TASK
export async function toggleCompleteTask(task: { id: string; status: string }) {
  const newStatus = task.status === 'pending' ? 'completed' : 'pending';
  return updateTask(task.id, { status: newStatus });
}
