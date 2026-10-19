import { useState } from "react";
import type { Task } from "../types/Task";

interface TaskCardProps {
  task: Task;
  // onDelete must be function that receives ID as number
  onDelete: (id: number) => void;
  // onStatusChange receives task ID and its new status
  onStatusChange: (id: number, status: Task["status"]) => void;
  // onEdit receives task ID and edited task properties
  onEdit: (
    id: number,
    title: string,
    description: string,
    category: Task["category"],
    priority: Task["priority"],
    dueDate: string,
  ) => void;
}

function TaskCard({ task, onDelete, onStatusChange, onEdit }: TaskCardProps) {
  // Stores whether task is currently being edited
  const [isEditing, setIsEditing] = useState(false);

  // Stores title while task is being edited
  const [editedTitle, setEditedTitle] = useState(task.title);

  // Stores description while task is being edited
  const [editedDescription, setEditedDescription] = useState(task.description);

  // Stores category while task is being edited
  const [editedCategory, setEditedCategory] = useState<Task["category"]>(
    task.category,
  );

  // Stores priority while task is being edited
  const [editedPriority, setEditedPriority] = useState<Task["priority"]>(
    task.priority,
  );

  // Stores due date while task is being edited
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

  // Stores error message when edited task is invalid
  const [editError, setEditError] = useState("");

  return (
    <article className="task-card">
      {/* Connects title label to unique input for accessibility */}
      {isEditing ? (
        <>
          <label htmlFor={`title-${task.id}`}>Title</label>
          <input
            id={`title-${task.id}`}
            type="text"
            value={editedTitle}
            onChange={(event) => setEditedTitle(event.target.value)}
          />
        </>
      ) : (
        <h4>{task.title}</h4>
      )}

      {/* Announces edit error to screen readers */}
      {editError && <p role="alert">{editError}</p>}

      {/* Connects description label to unique textarea for accessibility */}
      {isEditing ? (
        <>
          <label htmlFor={`description-${task.id}`}>Description</label>
          <textarea
            id={`description-${task.id}`}
            value={editedDescription}
            onChange={(event) => setEditedDescription(event.target.value)}
          />
        </>
      ) : (
        <p>{task.description}</p>
      )}

      {/* Connects the category label to a unique select for accessibility */}
      {isEditing ? (
        <>
          <label htmlFor={`category-${task.id}`}>Category</label>
          <select
            id={`category-${task.id}`}
            value={editedCategory}
            onChange={(event) =>
              setEditedCategory(event.target.value as Task["category"])
            }
          >
            <option value="content">Content</option>
            <option value="ecommerce">E-commerce</option>
            <option value="marketing">Marketing</option>
            <option value="web">Web</option>
          </select>
        </>
      ) : (
        <p className="task-category">Category: {task.category}</p>
      )}

      {/* Connects priority label to unique select for accessibility */}
      {isEditing ? (
        <>
          <label htmlFor={`priority-${task.id}`}>Priority</label>
          <select
            id={`priority-${task.id}`}
            value={editedPriority}
            onChange={(event) =>
              setEditedPriority(event.target.value as Task["priority"])
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </>
      ) : (
        <p className="task-priority">Priority: {task.priority}</p>
      )}

      {/* Connects due date label to unique input for accessibility */}
      {isEditing ? (
        <>
          <label htmlFor={`due-date-${task.id}`}>Due date</label>
          <input
            id={`due-date-${task.id}`}
            type="date"
            value={editedDueDate}
            onChange={(event) => setEditedDueDate(event.target.value)}
          />
        </>
      ) : (
        <p className="task-due-date">Due date: {task.dueDate}</p>
      )}

      <div className="status-field">
        {/* Displays current status and lets user select a new one */}
        <label htmlFor={`status-${task.id}`}>Status</label>

        <select
          id={`status-${task.id}`}
          value={task.status}
          onChange={(event) =>
            onStatusChange(task.id, event.target.value as Task["status"])
          }
        >
          <option value="todo">To Do</option>
          <option value="doing">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Shows Save while editing. On click, saves edited task data and exits editing mode */}
      {isEditing ? (
        <>
          <button
            className="save-button"
            onClick={() => {
              if (editedTitle.trim() === "") {
                setEditError("Title is required.");
                return;
              }

              setEditError("");

              onEdit(
                task.id,
                editedTitle,
                editedDescription,
                editedCategory,
                editedPriority,
                editedDueDate,
              );
              setIsEditing(false);
            }}
          >
            Save
          </button>

          <button
            className="cancel-button"
            onClick={() => {
              setEditedTitle(task.title);
              setEditedDescription(task.description);
              setEditedCategory(task.category);
              setEditedPriority(task.priority);
              setEditedDueDate(task.dueDate);
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <button className="edit-button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      )}

      {/* Calls onDelete with task ID when Delete button is clicked */}
      <button className="delete-button" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </article>
  );
}

export default TaskCard;
