// folosim fs -> pt a citi din baza de date si a scrie in baza de date
// folosim commander -> pt a lua informatie de la utilizator prin intermediul terminalului
// folosim path -> scriem un path care sa mearga pe orice calculator (noi o sa il folosim pt path catre db)
// folosim __dirname -> pt a localiza de unde este executat fisierul

const fs = require("fs");
const path = require("path");
const nanoid = require("nanoid");

const tasksPath = path.join(__dirname, "db", "tasks.json");

console.log(tasksPath);

// ! list task
function listTasks() {
  fs.readFile(tasksPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Eroare la citirea fisierului:", err);
      return;
    }

    const tasks = JSON.parse(data);
    console.table(tasks);
  });
}

// ! add task
function addTask(task) {
  if (!task) {
    console.error("Trebuie sa completezi task-ul");
    return;
  }

  // citire din db
  fs.readFile(tasksPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Eroare la citirea fisierului", err);
      return;
    }

    const tasks = JSON.parse(data);
    const newTask = { id: String(Date.now()), task: task };

    tasks.push(newTask);

    console.table(tasks);

    fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        console.err("Erroare la scrierea in db", err);
        return;
      }
      console.log("Task-ul a fost adaugat!");
    });
  });
}

module.exports = {
  listTasks,
  addTask,
};
