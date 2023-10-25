const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const agenda = [
  {
    name: "Paul",
    adresa: "Gh Lazar",
    telefon: "000 000 0000",
  },
  {
    name: "Adrian",
    adresa: "Stada Noua",
    telefon: "111 111 1111",
  },
  {
    name: "Alexandru",
    adresa: "Stada Veche",
    telefon: "222 222 2222",
  },
];

// 1. Rută de informații personale: Creați o rută ('/info') care afișează numele, adresa și numărul de telefon al unei persoane pe pagină.
app.get("/info", (req, res) => {
  res.json(agenda);
});

app.get("/info/:name", (req, res) => {
  const name = req.params.name;

  const contact = agenda.find((element) => element.name === name);

  if (contact) {
    res.json(contact);
  } else {
    res.json({ message: `${name} nu exista in agenda` });
  }
});

app.delete("/info/:name", (req, res) => {
  const name = req.params.name;
  const contact = agenda.filter((element) => element.name !== name);
  res.json(contact);
});

// 2. Rută de adunare: Creați o rută care acceptă doi parametri numerici și returnează suma lor.
app.get("/adunare/:numar1/:numar2", (req, res) => {
  console.log(req.params);
  const numar1 = Number(req.params.numar1);
  const numar2 = Number(req.params.numar2);
  const suma = numar1 + numar2;
  res.send(`Suma numerelor este ${suma}!`);
});

// 3. Formular de contact: Creați un formular de contact simplu cu câmpuri pentru nume și mesaj.
// Procesați datele trimise prin formular și afișați mesajul pe o pagină separată.
app.post("/contact", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const mesaj = req.body.mesaj;
  res.send(`Mesajul trimis de ${name}: ${mesaj}`);
});

// 4. Afisarea orei curente: Creați o rută care afișează ora curentă pe pagină.

app.get("/ora", (req, res) => {
  const oraCurenta = new Date().toLocaleTimeString();
  res.send(`Ora curenta este:${oraCurenta}`);
});

app.listen(port, () => {
  console.log(`Server-ul ruleaza pe portul ${port}`);
});
