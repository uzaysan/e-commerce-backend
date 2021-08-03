import DatabaseAdapter from "../adapters/DatabaseAdapter.js";
import Query from "../Query.js";
import Auth from "../Auth.js";
import Session from "./Session.js";
import { generateObjectId } from "../util/ObjectIdUtils.js";
import { generateSessionToken } from "../util/SessionUtil.js";

export default class User {
  constructor(user) {
    if (user._id) this._id = user._id;
    if (user.name) this.name = user.name;
    if (user.email) this.email = user.email;
    if (user.password) this.password = user.password;
  }

  async register() {
    const user = { ...this, _id: generateObjectId() };
    user.password = await Auth.encryptPassword(user.password);
    await DatabaseAdapter.getCollection(User.getCollectionName()).insertOne(
      user
    );
    const token = await generateSessionToken();
    await new Session(token, user).save();
    return { ...user, sessionToken: token, password: undefined };
  }

  static getQuery() {
    return new Query(this.getCollectionName());
  }

  static getCollectionName() {
    return "User";
  }
}
