import express from "express";
import compression from "compression";

import mainRouter from "./src/routers/MainRouter.js";

const app = express();

app.use(compression());
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(express.json({ limit: "1mb" }));

app.use("/api", mainRouter);
app.get("/", (req, res) => res.send("Hello Neo!"));

export default app;
