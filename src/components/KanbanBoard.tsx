// useState stores data that can change in the component
// useEffect runs code when the component loads, such as fetching data
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

function KanbanBoard() {
  // Stores the tasks fetched from the backend
  const [tasks, setTasks] = useState<Task[]>([]);

  // Stores whether the tasks are currently being loaded
  const [isLoading, setIsLoading] = useState(true);

  // Stores an error message if the tasks cannot be loaded
  const [error, setError] = useState("");

  // Fetches tasks from the backend when the component loads
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

  // Creates a new task and adds the returned task to the state
  function handleAddTask(newTask: Task) {
    createTask(newTask).then((data) => setTasks([...tasks, data]));
  }

  // Deletes a task and removes it from the state
  function handleDeleteTask(id: number) {
    deleteTask(id).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  }

  // Updates task status and updates state
  function handleStatusChange(id: number, newStatus: Task["status"]) {
    updateTask(id, { status: newStatus }).then((updatedTask) => {
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
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
    }).then((updatedTask) => {
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    });
  }

  // Displays a loading message while tasks are being fetched
  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  // Displays an error message if the tasks could not be loaded
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="board">
      <h2>My Board</h2>

      {/* Passes the add task function to TaskForm */}
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
