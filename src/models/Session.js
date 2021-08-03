import DatabaseAdapter from "../adapters/DatabaseAdapter.js";
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

  async save() {
    return await DatabaseAdapter.getCollection(
      Session.getCollectionName()
    ).insertOne(this);
  }

  static getQuery() {
    return new Query(this.getCollectionName());
  }

  static getCollectionName() {
    return "Session";
  }

  static async getUserFromToken(token) {
    const query = this.getQuery();
    query.equalTo("token", token);
    const session = await query.findOne();
    const expiresAt = new Date(session.expiresAt);
    const now = new Date();
    if (now > expiresAt) throw new Error("Invalid Session Token");
    return await User.getQuery().findWithId(session.user);
  }
}
