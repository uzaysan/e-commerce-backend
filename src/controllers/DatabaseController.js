import { MongoClient } from "mongodb";
import { DATABASE_URI, DATABASE_NAME } from "../../keys.js";

const client = new MongoClient(DATABASE_URI);
export const database = client.db(DATABASE_NAME);

export const connect = async (callback) => {
  try {
    await client.connect();
    console.log("Connected to database.");
    callback(null);
  } catch (err) {
    callback(err);
  }
};
