import DatabaseAdapter from "../adapters/DatabaseAdapter.js";
import Query from "../Query.js";
import User from "./User.js";
import { generateObjectId } from "../util/ObjectIdUtils.js";

export default class Session {
  /**
   * @constructor
   * @param {String} token
   * @param {User} user
   */
  constructor(token, user) {
    this._id = generateObjectId();
    this.token = token;
    this.user = user._id;
    this.expiresAt = new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ).toISOString();
  }

  /**
   * @returns {InsertOneResult}
   */
  async save() {
    return await DatabaseAdapter.getCollection(
      Session.getCollectionName()
    ).insertOne(this);
  }

  /**
   * @static
   * @returns {Query} returns a query;
   */
  static getQuery() {
    return new Query(this.getCollectionName());
  }

  /**
   *
   * @returns {String} returns collection name;
   */
  static getCollectionName() {
    return "Session";
  }

  /**
   * takes a session token as param.
   * and returns the associated User
   *
   * @param {String} token
   * @returns {User}
   */
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
