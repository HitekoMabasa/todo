const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files (like your video)
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' folder

// Route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Serve index.html file on root
});


// In-memory database for tasks
let tasks = [];

// Middleware
app.use(cors());
app.use(express.json());

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a task
app.post('/tasks', (req, res) => {
  const { description } = req.body;
  const newTask = { id: tasks.length + 1, description, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const task = tasks.find(t => t.id === parseInt(id));
  if (task) {
    task.completed = completed;
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(t => t.id !== parseInt(id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
