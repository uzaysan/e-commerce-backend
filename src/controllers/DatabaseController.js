const MongoClient = require("mongodb").MongoClient;
const DATABASE_URI = require("../../keys").DATABASE_URI;

const client = new MongoClient(DATABASE_URI);

const connect = async () => {
  await client.connect();
  console.log("Connected to database.");
};

module.exports = {
  client,
  connect,
};
