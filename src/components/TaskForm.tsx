import { useState } from "react";
import type { Task } from "../types/Task";

// onAddTask must be a function that receives a Task object
interface TaskFormProps {
  onAddTask: (task: Task) => void;
}
function TaskForm({ onAddTask }: TaskFormProps) {
  // Stores and updates the text input values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // Stores and updates the selected category and priority
  const [category, setCategory] = useState<Task["category"]>("content");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  // Stores and updates the selected due date
  const [dueDate, setDueDate] = useState("");

  // Handles the form submit event and prevents the browser from reloading the page
  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const newTask: Task = {
      id: Date.now(),
      title: title,
      description: description,
      category: category,
      priority: priority,
      status: "todo",
      dueDate: dueDate,
    };

    // Passes the new task to the parent component
    onAddTask(newTask);

    // Resets the form after the task has been created
    setTitle("");
    setDescription("");
    setCategory("content");
    setPriority("medium");
    setDueDate("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {/* Calls handleSubmit when the form is submitted */}
      <h3>Add New Task</h3>

      <div className="form-field">
        {/* Connects the label to the input field for accessibility */}
        <label htmlFor="title">Title</label>
        {/* Connects the input value to state and updates it when the user types */}
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
        {/* Lets the user select one of the allowed task categories */}
        <label htmlFor="category">Category</label>

        <select
          id="category"
          name="category"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value as Task["category"])
          }
        >
          {" "}
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
          {" "}
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-field">
        {/* Lets the user select a due date from the browser's date picker */}
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          name="dueDate"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
      </div>

      {/* Submits the form to create a new task */}
      <button className="create-task-button" type="submit">
        Create Task
      </button>
    </form>
  );
}

export default TaskForm;
