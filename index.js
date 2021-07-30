const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");

const mainRouter = require("./src/routers/MainRouter");

const app = express();
const port = 3000;

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", mainRouter);

app.listen(port, () => {
  console.log(`Server started at the port ${port}`);
});
