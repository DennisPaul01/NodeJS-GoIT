const express = require("express");
const router = express.Router();

const { addTask, listTasks, deleteTask } = require("../controllers");

router.get("/tasks", async (req, res, next) => {
  try {
    const tasks = await listTasks();
    console.log(tasks);
    res.json({
      status: "success",
      code: 200,
      data: {
        ...tasks,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/tasks", async (req, res, next) => {
  const { task } = req.body;

  try {
    const data = await addTask(task); // Așteaptă finalizarea adăugării task-ului
    res.status(201).json({
      status: "success",
      code: 201,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Eroare la adăugarea task-ului",
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
      message: "Eroare la ștergerea task-ului",
    });
  }
});

module.exports = router;
