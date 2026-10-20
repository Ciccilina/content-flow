import { useState } from "react";
import type { Task } from "../types/Task";

// Defines function that TaskForm receives from its parent component
interface TaskFormProps {
  onAddTask: (task: Task) => void;
}
// Handles form for creating new task and stores entered values in state
function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Task["category"]>("content");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [dueDate, setDueDate] = useState("");

  // Handles form submit event and prevents browser from reloading page
  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    // Creates Task object from current form values
    const newTask: Task = {
      id: Date.now(),
      title: title,
      description: description,
      category: category,
      priority: priority,
      status: "todo",
      dueDate: dueDate,
    };

    // Passes new task to parent component
    onAddTask(newTask);

    // Resets form after task has been created
    setTitle("");
    setDescription("");
    setCategory("content");
    setPriority("medium");
    setDueDate("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>Add New Task</h3>

      <div className="form-field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="category">Category</label>

        <select
          id="category"
          name="category"
          value={category}
          // Tells TypeScript the selected value is one of the allowed Task categories
          onChange={(event) =>
            setCategory(event.target.value as Task["category"])
          }
        >
          <option value="content">Content</option>
          <option value="ecommerce">E-commerce</option>
          <option value="marketing">Marketing</option>
          <option value="web">Web</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value as Task["priority"])
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          name="dueDate"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
      </div>

      <button className="create-task-button" type="submit">
        Create Task
      </button>
    </form>
  );
}

export default TaskForm;
