import DatabaseAdapter from "../adapters/DatabaseAdapter.js";
import Query from "../Query.js";
import Auth from "../Auth.js";
import Session from "../models/Session.js";
import { generateObjectId } from "../util/ObjectIdUtils.js";
import { generateSessionToken } from "../util/SessionUtil.js";

export default class User {
  constructor(user) {
    if (user._id) this._id = user._id;
    if (user.name) this.name = user.name;
    if (user.email) this.email = user.email;
    if (user.password) this.password = user.password;
  }

  static async login(email, password) {
    const query = User.getQuery();
    query.equalTo("email", email);
    const user = await query.findOne({
      projection: { password: 1, name: 1, email: 1 },
    });
    console.log("User", user);
    const isValid = await Auth.comparePasswords(password, user.password);
    if (!isValid) throw new Error("Invalid credentials");
    const token = await generateSessionToken();
    await new Session(token, user).save();
    return { ...user, sessionToken: token, password: undefined };
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
