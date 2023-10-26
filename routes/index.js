const express = require("express");
const router = express.Router();
const { listTasks, addTask } = require("../services/todo");

router.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    code: 200,
    data: "Server ok!",
  });
  next();
});

router.get("/tasks", async (req, res, next) => {
  try {
    const tasks = await listTasks();
    console.log(tasks);
    res.status(200).json({
      status: "success",
      code: 200,
      data: { ...tasks },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Eroare la preluarea task-urilor",
    });
  }
});

router.post("/tasks", async (req, res, next) => {
  const { task } = req.body;
  try {
    const data = await addTask(task);
    res.status(201).json({
      status: "success",
      code: 201,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Eroare la adaugarea task-ului",
    });
  }
});

router.delete("/tasks/:taskId", async (req, res, next) => {
  const { taskId } = req.params;

  try {
    await deleteTask(taskId);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Eroare la stergerea task-ului",
    });
  }
});

router.delete("/tasks/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, phone, eewqeq } = req.body;

  try {
    await deleteTask(taskId);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Eroare la stergerea task-ului",
    });
  }
});

module.exports = router;
