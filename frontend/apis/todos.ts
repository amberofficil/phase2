'use client'; // ✅ ensures this file runs on client only

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7860";

// Helper: Get auth headers safely
function authHeaders() {
  const token = localStorage.getItem('token'); // safe now
  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  };
}

// ---------------- GET TASKS ----------------
export async function getTasks() {
  const res = await fetch(`${API_URL}/api/tasks`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

// ---------------- ADD TASK ----------------
export async function addTask(task: any) {
  const res = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to add task');
  return res.json();
}

// ---------------- UPDATE TASK ----------------
export async function updateTask(id: string, task: any) {
  const res = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
}

// ---------------- DELETE TASK ----------------
export async function deleteTask(id: string) {
  const res = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete task');
  return res.json();
}

