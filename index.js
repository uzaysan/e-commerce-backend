import express from "express";
import compression from "compression";
import { Server } from "socket.io";

import mainRouter from "./src/routers/MainRouter.js";
import { connect, database } from "./src/controllers/DatabaseController.js";

const app = express();
const port = 3000;

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", mainRouter);

connect((err) => {
  if (err) {
    console.log("Failed to connect database!");
    return;
  }
  const server = app.listen(port, () => {
    console.log(`Server started at the port ${port}`);
  });
  const socketio = new Server(server);
  socketio.on("connection", (socket) => {
    socket.join(socket.handshake.query.productId);
  });

  const dbStream = database.collection("Product").watch();
  dbStream.on("change", (change) => {
    if (change.operationType === "update") {
      socketio.in(change.documentKey._id).emit("product-update", {
        _id: change.documentKey._id,
        ...change.updateDescription.updatedFields,
      });
    }
  });
});
