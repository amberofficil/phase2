'use client';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://amberofficial-todo.hf.space"; // ✅ backend URL

function authHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  };
}

// ---------------- GET TASKS ----------------
export async function getTasks() {
  const res = await fetch(`${API_URL}/tasks/`, {  // ✅ remove /api
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

// ---------------- ADD TASK ----------------
export async function addTask(task: any) {
  const res = await fetch(`${API_URL}/tasks/`, {  // ✅ remove /api
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to add task');
  return res.json();
}

// ---------------- UPDATE TASK ----------------
export async function updateTask(id: string, task: any) {
  const res = await fetch(`${API_URL}/tasks/${id}/`, {  // ✅ remove /api
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
}

// ---------------- DELETE TASK ----------------
export async function deleteTask(id: string) {
  const res = await fetch(`${API_URL}/tasks/${id}/`, {  // ✅ remove /api
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete task');
  return res.json();
}


