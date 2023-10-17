// import { nume, varsta } from "./lectia1.js";

// import getIdentity from "./lectia1.js";

// console.log(nume);
// console.log(varsta);
// console.log(getIdentity());

// const lectia1 = require("./lectia1.js");

// const { nume, varsta, getIdentity } = lectia1;

// console.log(nume);
// console.log(varsta);
// console.log(getIdentity());

// console.log("Paul");

const fs = require("fs");

// Exercițiu 1: Citirea unui fișier
// Cerință: Creați un program Node.js care să citească conținutul unui fișier specificat și să îl afișeze în consolă.
// fs.readFile("./identitate.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });

// Exercițiu 2: Scrierea într-un fișier
// Cerință: Scrieți un program care să creeze un fișier nou sau să suprascrie un fișier existent cu un text specificat.

// const newText =
//   "Acesta este un text adaugat de la exercitiul 2. Module 1. NodeJS";

// fs.writeFile("fisier-nou.txt", newText, "utf-8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("Fisierul a fost modificat cu succes!");
// });

// Exercițiu 3: Adăugarea într-un fișier
// Cerință: Creați un program care să adauge o linie de text la sfârșitul unui fișier fără a șterge conținutul anterior.

// const newText3 = `\n Acesta este un text adaugat de la exercitiul 3.`;

// fs.appendFile("fisier-nou.txt", newText3, "utf-8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("Fisierul a fost modificat cu succes! de la exercitiul 3");
// });

// Exercițiu 4: Redenumirea fișierului
// Cerință: Scrieți un program care să redenumească un fișier specificat, schimbându-i numele din "vechiul-nume.txt" în "noul-nume.txt".

// fs.rename("identitate.txt", "IdentitateNoua.txt", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("Numele fisierului a fost schimbat cu succes!");
// });

// Exercițiu 5: Ștergerea unui fișier
// Cerință: Creați un program care să șteargă un fișier specificat.

// fs.unlink("IdentitateNoua.txt", (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("Fisierul a fost sters cu succes!");
// });

// Exercițiu 6: Copierea conținutului dintr-un fișier în altul
// Cerință: Scrieți un program care să citească conținutul dintr-un fișier sursă și să îl scrie într-un fișier țintă.

// fs.readFile("fisier-nou.txt", "utf-8", (err, dataFisierNou) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(dataFisierNou);

//   fs.writeFile("Fisier-Tinta.txt", dataFisierNou, "utf-8", (err, data) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("Copierea s-a efectuat cu succes!");
//   });
// });

// Exercițiu 7: Listarea fișierelor dintr-un director
// Cerință: Creați un program care să listeze toate fișierele dintr-un director specificat.

// fs.readdir(".", (err, files) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log("Fisierele din director (folder):");
//   files.forEach((file) => {
//     console.log(`${file}`);
//   });
// });

// Exercițiu 8: Manipularea fișierelor JSON
// Cerință: Scrieți un program care să permită citirea și modificarea unui fișier JSON. De exemplu, să puteți adăuga, actualiza sau șterge elemente într-un fișier JSON.

fs.readFile("data.json", "utf-8", (err, data) => {
  if (err) {
    console.err(err);
    return;
  }
  console.log(data);
  const obiectJavascript = JSON.parse(data);
  console.log(obiectJavascript);

  obiectJavascript.descriere = "Este inalt!";

  fs.writeFile(
    "data.json",
    JSON.stringify(obiectJavascript),
    "utf-8",
    (err, data) => {
      if (err) {
        console.err(err);
        return;
      }
      console.log("Noua proprietate a fost adaugata!");
    }
  );
});
