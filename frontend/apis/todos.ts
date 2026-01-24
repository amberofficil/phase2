const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7860";

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
}

// GET TASKS
export async function getTasks() {
  const res = await fetch(`${API_URL}/api/tasks`, {
    headers: authHeaders(),
  });
  return res.json();
}

// ADD TASK
export async function addTask(task: any) {
  const res = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: authHeaders(), // ✅ FIX
    body: JSON.stringify(task),
  });
  return res.json();
}

// UPDATE TASK
export async function updateTask(id: string, task: any) {
  const res = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'PUT',
    headers: authHeaders(), // ✅ FIX
    body: JSON.stringify(task),
  });
  return res.json();
}

// DELETE TASK
export async function deleteTask(id: string) {
  await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'DELETE',
    headers: authHeaders(), // ✅ FIX
  });
}
