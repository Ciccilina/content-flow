import { useState } from "react";
import type { Task } from "../types/Task";

// Defines data and functions TaskCard receives from parent component
interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Task["status"]) => void;
  onEdit: (
    id: number,
    title: string,
    description: string,
    category: Task["category"],
    priority: Task["priority"],
    dueDate: string,
  ) => void;
}

// Displays task and handles editing, status changes and actions
function TaskCard({ task, onDelete, onStatusChange, onEdit }: TaskCardProps) {
  // Stores temporary values while task is being edited
  const [isEditing, setIsEditing] = useState(false);

  const [editedTitle, setEditedTitle] = useState(task.title);

  const [editedDescription, setEditedDescription] = useState(task.description);

  const [editedCategory, setEditedCategory] = useState<Task["category"]>(
    task.category,
  );

  const [editedPriority, setEditedPriority] = useState<Task["priority"]>(
    task.priority,
  );

  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

  const [editError, setEditError] = useState("");

  return (
    <article className="task-card">
      {/* Shows edit fields when editing, otherwise displays saved task data */}
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

      {/* Shows Save/Cancel while editing, otherwise shows Edit */}
      {isEditing ? (
        <>
          <button
            type="button"
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
            type="button"
            className="cancel-button"
            onClick={() => {
              setEditedTitle(task.title);
              setEditedDescription(task.description);
              setEditedCategory(task.category);
              setEditedPriority(task.priority);
              setEditedDueDate(task.dueDate);
              setEditError("");
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          type="button"
          className="edit-button"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      )}

      <button
        type="button"
        className="delete-button"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </article>
  );
}

export default TaskCard;
