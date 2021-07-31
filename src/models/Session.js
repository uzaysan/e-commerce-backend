const database = require("../controllers/DatabaseController").database;
const sessions = database.collection("Session");
const Query = require("../Query");
const { generateObjectId } = require("../util/ObjectIdUtils");

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
}

module.exports = Session;
