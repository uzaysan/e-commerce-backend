import { database } from "../controllers/DatabaseController.js";
const sessions = database.collection("Session");
import Query from "../Query.js";
import User from "../models/User.js";
import { generateObjectId } from "../util/ObjectIdUtils.js";

const oneYear = 1000 * 60 * 60 * 24 * 365;

export default class Session {
  constructor(token, user) {
    this._id = generateObjectId();
    this.token = token;
    this.user = user._id;
    this.expiresAt = new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ).toISOString();
  }

  save() {
    return sessions.insertOne(this);
  }

  static getQuery() {
    return new Query("Session");
  }

  static getUserFromToken(token) {
    return new Promise((resolve, reject) => {
      const query = this.getQuery();
      query.equalTo("token", token);
      query
        .find()
        .then((session) => {
          console.log("Session from token", session);
          const expiresAt = new Date(session.expiresAt);
          const now = new Date();
          if (now > expiresAt) throw "Invalid Session Token";
          return User.getQuery().findWithId(session.user);
        })
        .then((user) => {
          console.log("User from token", user);
          resolve(user);
        })
        .catch((err) => reject(err));
    });
  }
}
