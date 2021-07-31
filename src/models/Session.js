const database = require("../controllers/DatabaseController").database;
const sessions = database.collection("Session");
const Query = require("../Query");
const User = require("../models/User");
const { generateObjectId } = require("../util/ObjectIdUtils");

const oneYear = 1000 * 60 * 60 * 24 * 365;

class Session {
  constructor(token, user) {
    this._id = generateObjectId();
    this.token = token;
    this.user = user;
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
          const expiresAt = new Date(session.expiresAt);
          const now = new Date();
          if (now > expiresAt) throw "Invalid Session Token";
          return User.getQuery().findWithId(session.user);
        })
        .then((user) => resolve(user))
        .catch((err) => reject(err));
    });
  }
}

module.exports = Session;
