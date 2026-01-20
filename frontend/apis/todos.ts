// frontend/apis/todos.ts
export const API_URL = "http://localhost:8000"; // <-- yahan backend URL

// Get all tasks
export const fetchTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`);
  return res.json();
};

// Add task
export const addTask = async (task: { title: string; description: string }) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

// Delete task
export const deleteTask = async (id: number) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
  return res.json();
};

// Update task
export const updateTask = async (id: number, task: { title: string; description: string }) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

// Complete task
export const completeTask = async (id: number) => {
  const res = await fetch(`${API_URL}/tasks/${id}/complete`, { method: "PATCH" });
  return res.json();
};
