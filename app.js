const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

require("./middlewares/passportConfig.js");

const routerApi = require("./routes/index.js");
const coreOptions = require("./cors");

const app = express();

app.use(express.json());
app.use(cors(coreOptions));
app.use(morgan("tiny"));

app.use("/api", routerApi);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/tasks",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

const PORT = process.env.PORT_SERVER || 5000;
const URL_DB = process.env.DB_URL;

mongoose
  .connect(URL_DB)
  .then(() => {
    console.log("Serverul MongoDB ruleaza");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Serverul nu realza. Eroare:${err.message}`);
  });
