// Imports the Express package
import express from "express";

// Imports CORS to allow requests from the frontend
import cors from "cors";

// Imports Node's file system module to read and write files
import fs from "fs";

// Creates the Express application
const app = express();

// Allows the frontend to communicate with the backend
app.use(cors());

// Allows the server to read JSON data sent from the frontend
app.use(express.json());

// Defines the port where the backend server will run
const PORT = 3000;

// Reads the saved tasks from the JSON file
const tasksData = fs.readFileSync("./tasks.json", "utf-8");

// Converts the JSON text into a JavaScript array
const tasks = JSON.parse(tasksData);

// Saves the current tasks array to the JSON file
function saveTasks() {
  fs.writeFileSync("./tasks.json", JSON.stringify(tasks, null, 4));
}

// Returns all tasks to the client
app.get("/tasks", (request, response) => {
  response.json(tasks);
});

// Creates a new task and adds it to the tasks array
app.post("/tasks", (request, response) => {
  const newTask = request.body;

  tasks.push(newTask);

  // Saves the updated tasks to the JSON file
  saveTasks();

  response.status(201).json(newTask);
});

// Deletes the task with the matching ID
app.delete("/tasks/:id", (request, response) => {
  const taskId = Number(request.params.id);

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);

    // Saves the updated tasks to the JSON file
    saveTasks();
  }

  response.status(204).send();
});

// Updates the task with the matching ID
app.patch("/tasks/:id", (request, response) => {
  const taskId = Number(request.params.id);

  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return response.status(404).json({ message: "Task not found" });
  }

  Object.assign(task, request.body);

  // Saves the updated task to the JSON file
  saveTasks();

  response.json(task);
});

// Starts the server and listens for requests on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
