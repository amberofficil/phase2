// frontend/apis/todos.ts

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

// ✅ Get auth header from localStorage token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// ----------------------
// Get all tasks
// ----------------------
export const fetchTasks = async () => {
  const res = await fetch(`${API_URL}/tasks/`, {
    method: "GET",
    headers: getAuthHeader(),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch tasks: ${err}`);
  }

  const json = await res.json();
  return json.data.tasks; // ✅ tasks ApiResponse.data.tasks me hain
};

// ----------------------
// Add task
// ----------------------
export const addTask = async (task: {
  title: string;
  description?: string;
}) => {
  const res = await fetch(`${API_URL}/tasks/`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to add task: ${err}`);
  }

  const json = await res.json();
  return json.data; // ✅ new task object
};

// ----------------------
// Update task
// ----------------------
export const updateTask = async (
  id: string,
  task: { title?: string; description?: string; status?: string }
) => {
  const res = await fetch(`${API_URL}/tasks/${id}/`, {
    method: "PUT",
    headers: getAuthHeader(),
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to update task: ${err}`);
  }

  const json = await res.json();
  return json.data; // ✅ updated task
};

// ----------------------
// Delete task
// ----------------------
export const deleteTask = async (id: string) => {
  const res = await fetch(`${API_URL}/tasks/${id}/`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to delete task: ${err}`);
  }

  const json = await res.json();
  return json.data; // ✅ deleted task / success info
};
