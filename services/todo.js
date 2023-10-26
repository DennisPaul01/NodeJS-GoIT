const fs = require("fs").promises;
const path = require("path");

const tasksPath = path.join(__dirname, "..", "db", "tasks.json");

// ! list task
async function listTasks() {
  try {
    const data = await fs.readFile(tasksPath, "utf-8");
    const tasks = JSON.parse(data);
    console.table(tasks);
    return tasks;
  } catch (error) {
    console.error("Eroare la citirea fisierului:", err);
    throw error;
  }
}

// ! add task
async function addTask(task) {
  if (!task) {
    console.error("Trebuie sa completezi task-ul");
    return;
  }

  try {
    const data = await fs.readFile(tasksPath, "utf-8");
    const tasks = JSON.parse(data);
    const newTask = { id: String(Date.now()), task: task };

    tasks.push(newTask);

    await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));

    console.log("Task-ul a fost adaugat!");
    return tasks;
  } catch (error) {
    console.error("Eroare la citirea fisierului", err);
  }
}

async function updateContact(id, name, email, phone) {
  if (!task) {
    console.error("Trebuie sa completezi task-ul");
    return;
  }

  try {
    const data = await fs.readFile(tasksPath, "utf-8");
    const tasks = JSON.parse(data);
    const newTask = { id: String(Date.now()), task: task };

    // tasks.find(task=>task.id === id return {id:id, task.name:name});

    await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));

    console.log("Task-ul a fost adaugat!");
    return tasks;
  } catch (error) {
    console.error("Eroare la citirea fisierului", err);
  }
}

module.exports = {
  listTasks,
  addTask,
};
