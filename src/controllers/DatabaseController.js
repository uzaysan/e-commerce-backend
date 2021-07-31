const MongoClient = require("mongodb").MongoClient;
const { DATABASE_URI, DATABASE_NAME } = require("../../keys");

const client = new MongoClient(DATABASE_URI);
const database = client.db(DATABASE_NAME);

const connect = async (callback) => {
  try {
    await client.connect();
    console.log("Connected to database.");
    callback(null);
  } catch (err) {
    callback(err);
  }
};

module.exports = {
  database,
  connect,
};
