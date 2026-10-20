import type { Task } from "../types/Task";

// Uses deployed backend URL from Netlify if available
// Otherwise connects to local backend on port 3000
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Fetches all tasks from backend
// Promise<Task[]> means function will return a list of tasks asynchronously
export function getTasks(): Promise<Task[]> {
  return fetch(`${API_URL}/tasks`).then((response) => response.json());
}

// Sends new task to backend
export function createTask(newTask: Task): Promise<Task> {
  return fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  }).then((response) => response.json());
}

// Deletes task from backend
export function deleteTask(id: number): Promise<Response> {
  return fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });
}

// Updates task in backend
// Partial<Task> allows us to update only Task properties that have changed
export function updateTask(id: number, updates: Partial<Task>): Promise<Task> {
  return fetch(`${API_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  }).then((response) => response.json());
}
