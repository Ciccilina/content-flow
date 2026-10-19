import type { Task } from '../types/Task'

// Fetches all tasks from the backend
// Promise<Task[]> means function will return an array of tasks when request is complete
export function getTasks(): Promise<Task[]> {
    return fetch('http://localhost:3000/tasks')
        .then((response) => response.json())
}

// Sends a new task to the backend
// Promise<Task> means function will return one task when request is complete
export function createTask(newTask: Task): Promise<Task> {
    return fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
    })
        .then((response) => response.json())
}

// Deletes a task from the backend
// Promise<Response> means function will return server response when request is complete
export function deleteTask(id: number): Promise<Response> {
    return fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
    })
}

// Updates a task in the backend
// Partial<Task> allows us to update only the Task properties that have changed
// Promise<Task> means function will return updated task when request is complete
export function updateTask(
    id: number,
    updates: Partial<Task>
): Promise<Task> {
    return fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
    })
        .then((response) => response.json())
}