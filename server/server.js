import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

// Allows frontend to communicate with backend
app.use(cors());

// Allows server to read JSON data sent from frontend
app.use(express.json());

const PORT = 3000;

// Reads saved tasks from JSON file
const tasksData = fs.readFileSync("./tasks.json", "utf-8");

// Converts JSON data into JavaScript array
const tasks = JSON.parse(tasksData);

// Saves current tasks array to JSON file
function saveTasks() {
  fs.writeFileSync("./tasks.json", JSON.stringify(tasks, null, 4));
}

// Returns all tasks to client
app.get("/tasks", (request, response) => {
  response.json(tasks);
});

// Creates new task and adds it to tasks array
app.post("/tasks", (request, response) => {
  const newTask = request.body;

  tasks.push(newTask);

  // Saves updated tasks to JSON file
  saveTasks();

  response.status(201).json(newTask);
});

// Deletes task with matching ID
app.delete("/tasks/:id", (request, response) => {
  const taskId = Number(request.params.id);

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return response.status(404).json({ message: "Task not found" });
  }

  tasks.splice(taskIndex, 1);

  // Saves updated tasks to JSON file
  saveTasks();

  response.status(204).send();
});

// Updates task with matching ID
app.patch("/tasks/:id", (request, response) => {
  const taskId = Number(request.params.id);

  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return response.status(404).json({ message: "Task not found" });
  }

  Object.assign(task, request.body);

  // Saves updated task to JSON file
  saveTasks();

  response.json(task);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
