import { Server } from "socket.io";

import DatabaseAdapter from "./src/adapters/DatabaseAdapter.js";
import Product from "./src/repositories/Product.js";
import app from "./app.js";

const port = process.env.PORT || 3000;
console.log("Post is: ", port);
DatabaseAdapter.connectToDatabase()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`Server started at the port ${port}`);
    });
    const socketio = new Server(server);
    socketio.on("connection", (socket) => {
      socket.join(socket.handshake.query.productId);
    });

    const dbStream = DatabaseAdapter.getCollection(
      Product.getCollectionName()
    ).watch();
    dbStream.on("change", (change) => {
      if (change.operationType === "update") {
        socketio.in(change.documentKey._id).emit("product-update", {
          _id: change.documentKey._id,
          ...change.updateDescription.updatedFields,
        });
      }
    });
  })
  .catch((err) => console.log("Failed to connect database!", err));
