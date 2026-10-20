import { useEffect, useState } from "react";

import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import type { Task } from "../types/Task";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/taskService";

// Filters tasks by their status for each Kanban column
import { filterTasksByStatus } from "../utils/taskUtils";

// Manages tasks and connects frontend with backend
function KanbanBoard() {
  // Stores tasks, loading state and possible errors
  const [tasks, setTasks] = useState<Task[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");

  // Fetches tasks from backend when component loads
  useEffect(() => {
    getTasks()
      .then((data) => {
        setTasks(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to load tasks.");
        setIsLoading(false);
      });
  }, []);

  // Creates new task and adds returned task to state
  function handleAddTask(newTask: Task) {
    createTask(newTask)
      .then((data) => setTasks((currentTasks) => [...currentTasks, data]))
      .catch(() => {
        setError("Failed to create task.");
      });
  }

  // Deletes task and removes it from state
  function handleDeleteTask(id: number) {
    deleteTask(id)
      .then(() => {
        setTasks((currentTasks) =>
          currentTasks.filter((task) => task.id !== id),
        );
      })
      .catch(() => {
        setError("Failed to delete task.");
      });
  }

  // Updates task status and updates state
  function handleStatusChange(id: number, newStatus: Task["status"]) {
    updateTask(id, { status: newStatus })
      .then((updatedTask) => {
        setTasks((currentTasks) =>
          currentTasks.map((task) => (task.id === id ? updatedTask : task)),
        );
      })
      .catch(() => {
        setError("Failed to update task status.");
      });
  }

  // Updates edited task and updates state
  function handleEditTask(
    id: number,
    newTitle: string,
    newDescription: string,
    newCategory: Task["category"],
    newPriority: Task["priority"],
    newDueDate: string,
  ) {
    updateTask(id, {
      title: newTitle,
      description: newDescription,
      category: newCategory,
      priority: newPriority,
      dueDate: newDueDate,
    })
      .then((updatedTask) => {
        setTasks((currentTasks) =>
          currentTasks.map((task) => (task.id === id ? updatedTask : task)),
        );
      })
      .catch(() => {
        setError("Failed to update task.");
      });
  }

  // Displays loading message while tasks are being fetched
  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  // Displays error message if tasks could not be loaded
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="board">
      <h2>My Board</h2>

      <TaskForm onAddTask={handleAddTask} />

      <div className="kanban-columns">
        <section className="kanban-column todo-column">
          <h3>To Do</h3>

          {/* Filters tasks by status, then maps them into TaskCard components */}
          {filterTasksByStatus(tasks, "todo").map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onStatusChange={handleStatusChange}
              onEdit={handleEditTask}
            />
          ))}
        </section>

        <section className="kanban-column doing-column">
          <h3>In Progress</h3>

          {filterTasksByStatus(tasks, "doing").map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onStatusChange={handleStatusChange}
              onEdit={handleEditTask}
            />
          ))}
        </section>

        <section className="kanban-column done-column">
          <h3>Done</h3>

          {filterTasksByStatus(tasks, "done").map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onStatusChange={handleStatusChange}
              onEdit={handleEditTask}
            />
          ))}
        </section>
      </div>
    </section>
  );
}

export default KanbanBoard;
