import express from "express";
import validateTask from "../middleware/validateTask.js";

const router = express.Router();

let tasks = [];
let nextId = 1;

router.get("/", (req, res) => { // return all tasks
  return res.json(tasks);
});

router.get("/:id", (req, res) => { // return specific task, or 404
  const tempTask = tasks.find(task => task.id == req.params.id);
  if (tempTask != null)
  {
    return res.json(tempTask);
  }else return res.status(404).json(tempTask);
});

router.post("/", validateTask, (req, res) => { // create a new task and add it to list
  const newTask = req.body;
  newTask.id = tasks.length + 1;
  tasks.push(newTask);
  return res.status(201).json(newTask);
});

router.put("/:id", validateTask, (req, res) => { // find specific task and then replace it with new info
  const starterTask = tasks.findIndex(task => task.id == req.params.id);
  const replaceTask = req.body;
  if (starterTask != null && starterTask != -1)
  {
      replaceTask.id = tasks[starterTask].id;
      tasks[starterTask] = replaceTask;
      return res.json(replaceTask);
  }else return res.status(404).json(starterTask);
});

router.patch("/:id", (req, res) => { // patch a specific task with new data
  const starterTask = tasks.findIndex(task => task.id == req.params.id);
  const patchTask = req.body;
  if (starterTask != null && starterTask != -1)
  {
      if (patchTask.title !== undefined) {
          tasks[starterTask].title = patchTask.title;
      }
      if (patchTask.course !== undefined) {
          tasks[starterTask].course = patchTask.course;
      }
      if (patchTask.completed !== undefined) {
          tasks[starterTask].completed = patchTask.completed;
      }
    return res.json(tasks[starterTask]);
  }else return res.status(404).json(starterTask);
});

router.delete("/:id", (req, res) => { // delete a task from the list
  const starterTask = tasks.findIndex(task => task.id == req.params.id);
  if (starterTask != null && starterTask != -1)
  {
    tasks.splice(starterTask, 1);
    return res.sendStatus(204);
  }else return res.status(404).json(starterTask);
});

export default router;