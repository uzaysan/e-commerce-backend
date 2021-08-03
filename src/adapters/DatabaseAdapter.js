import { MongoClient } from "mongodb";
import { DATABASE_URI, DATABASE_NAME } from "../../keys.js";

const client = new MongoClient(DATABASE_URI);
export const database = client.db(DATABASE_NAME);

export default class DatabaseAdapter {
  static connectToDatabase(callback) {
    client
      .connect()
      .then(() => {
        callback(null);
        console.log("Connected to database.");
      })
      .catch((err) => callback(err));
  }

  static getCollection(collection) {
    return database.collection(collection);
  }
}
