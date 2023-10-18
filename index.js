const { addTask, listTasks } = require("./todo.js");

const { program } = require("commander");

// program
//   .option("-a, --action <type>", "alege operatiune")
//   .option("-t, --task <type>", "adauga task");

// program.parse(process.argv);

// const argv = program.opts();

// function determinareActiune({ action, task }) {
//   switch (action) {
//     case "list":
//       listTasks();
//       break;
//     case "add":
//       addTask(task);
//       break;
//     default:
//       console.log("Actiune neinrgistrata");
//   }
// }

// determinareActiune(argv);

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Introdu actiune (list, add): ", (actiune) => {
  switch (actiune) {
    case "list":
      listTasks();
      rl.close();
      break;
    case "add":
      rl.question("Introdu task: ", (task) => {
        addTask(task);
        rl.close();
      });
      break;
    default:
      console.log("Actiune neinregistrata!");
      rl.close();
  }
});

// rl.question("Introdu actiune (list, add): ", (actiune) => {
//   switch (actiune) {
//     case "list":
//       listTasks();
//       rl.close();
//       break;
//     case "add":
//       rl.question("Introdu name: ", (name) => {
//         rl.question("Introdu: email: ", (email) => {
//           rl.question("Introdu: email: ", (phone) => {
//             addContact(name, email, phone);
//           });
//         });
//       });
//       break;
//     default:
//       console.log("Actiune neinregistrata!");
//       rl.close();
//   }
// });
