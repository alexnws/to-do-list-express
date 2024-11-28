import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

let tasks: Task[] = [];
let currentId = 1;

// Ajouter une nouvelle tâche
app.post("/tasks", (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newTask: Task = { id: currentId++, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Obtenir toutes les tâches
app.get("/tasks", (_req: Request, res: Response) => {
  res.json(tasks);
});

// Mettre à jour une tâche
app.put("/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const task = tasks.find((t) => t.id === parseInt(id));

  if (!task) {
    return res.status(404).end();
  }

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// Supprimer une tâche
app.delete("/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).end();
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
