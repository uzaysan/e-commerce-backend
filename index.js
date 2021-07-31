const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");

const mainRouter = require("./src/routers/MainRouter");
const connectDatabase = require("./src/controllers/DatabaseController").connect;

const app = express();
const port = 3000;

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", mainRouter);

connectDatabase((err) => {
  if (err) {
    console.log("Failed to connect database!");
    return;
  }
  app.listen(port, () => {
    console.log(`Server started at the port ${port}`);
  });
});
