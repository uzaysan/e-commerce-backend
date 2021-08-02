import express, { urlencoded, json } from "express";
import compression from "compression";

import mainRouter from "./src/routers/MainRouter.js";
import { connect } from "./src/controllers/DatabaseController.js";

const app = express();
const port = 3000;

app.use(compression());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/api", mainRouter);

connect((err) => {
  if (err) {
    console.log("Failed to connect database!");
    return;
  }
  app.listen(port, () => {
    console.log(`Server started at the port ${port}`);
  });
});
