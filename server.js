const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("Middleware-ul nostru ");
  next();
});

app.get("/name", (req, res) => {
  console.log("Am ajuns aici!");
  res.send(`<h1>Numele meu este Paul</h1>`);
});
app.delete("/", (req, res) => {
  res.send(`<h1>Numele meu este Paul</h1>`);
});
app.post("/", (req, res) => {
  res.send(`<h1>Numele meu este Paul</h1>`);
});

app.listen(4000, () => {
  console.log("Aplicatia noastra ruleaza pe portul 4000!");
});
