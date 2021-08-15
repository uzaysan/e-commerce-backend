import { MongoClient } from "mongodb";
import { DATABASE_URI, DATABASE_NAME } from "../../keys.js";

const client = new MongoClient(DATABASE_URI);
export const database = client.db(DATABASE_NAME);

export default class DatabaseAdapter {
  /**
   * accepts a callback function.
   * if connected to database without any problem, runs the callback
   * function with null.
   * if there was an error, pass the error to callback function.
   * @param {function} callback
   */
  static connectToDatabase() {
    return client.connect();
  }

  /**
   * Takes string and return collection.
   * @param {String} collection
   * @returns {Collection} MongoDB Collection
   */
  static getCollection(collection) {
    return database.collection(collection);
  }
}
