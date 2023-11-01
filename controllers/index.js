const fs = require("fs").promises;
const path = require("path");
const nanoid = require("nanoid");

const tasksPath = path.join(__dirname, "..", "db", "tasks.json");

console.log(tasksPath);

// ! list task
async function listTasks() {
  try {
    const data = await fs.readFile(tasksPath, "utf-8");
    const tasks = JSON.parse(data);
    return tasks;
  } catch (error) {
    console.error("Eroare la citirea fisierului:", error);
    throw error; // Poți arunca eroarea sau să o gestionezi altfel
  }
}

// ! add task
async function addTask(task) {
  if (!task) {
    console.error("Trebuie să completezi task-ul");
    return;
  }

  try {
    // Citire din baza de date
    const data = await fs.readFile(tasksPath, "utf-8");
    const tasks = JSON.parse(data);
    const newTask = { id: String(Date.now()), task: task };

    tasks.push(newTask);

    // Scrierea în baza de date
    await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));

    console.log("Task-ul a fost adăugat!");

    return newTask;
  } catch (error) {
    console.error("Eroare la adăugarea task-ului:", error);
  }
}

async function deleteTask(taskId) {
  try {
    // Citire din baza de date
    const data = await fs.readFile(tasksPath, "utf-8");
    const tasks = JSON.parse(data);

    // Găsirea indexului task-ului de șters
    const index = tasks.findIndex((task) => task.id === taskId);

    if (index !== -1) {
      // Ștergerea task-ului
      tasks.splice(index, 1);

      // Scrierea în baza de date fără task-ul șters
      await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
      console.log(`Task-ul cu ID-ul ${taskId} a fost șters.`);
    } else {
      console.error(`Task-ul cu ID-ul ${taskId} nu a fost găsit.`);
    }
  } catch (error) {
    console.error("Eroare la ștergerea task-ului:", error);
  }
}

module.exports = {
  listTasks,
  addTask,
  deleteTask,
};
