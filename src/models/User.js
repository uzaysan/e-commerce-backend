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

  static login(email, password) {
    return new Promise((resolve, reject) => {
      let user;
      let token;
      const query = this.getQuery();
      query.equalTo("email", email);
      query
        .findOne({ projection: { password: 1 } })
        .then((foundUser) => {
          console.log("User", foundUser);
          user = foundUser;
          return Auth.comparePasswords(password, foundUser.password);
        })
        .then((isValid) => {
          console.log("Is Valid", isValid);
          if (isValid) return generateSessionToken();
          else throw "Invalid credentials";
        })
        .then((generatedToken) => {
          console.log("Token", generatedToken);
          token = generatedToken;
          const session = new Session(token, user);
          return session.save();
        })
        .then(() => {
          resolve({
            ...user,
            sessionToken: token,
            password: undefined,
          });
        })
        .catch((err) => reject(err));
    });
  }

  register() {
    return new Promise((resolve, reject) => {
      const user = { ...this, _id: generateObjectId() };
      let token;
      Auth.encryptPassword(user.password)
        .then((encryptedPassword) => {
          user.password = encryptedPassword;
          return DatabaseAdapter.getCollection(
            this.getCollectionName()
          ).insertOne(user);
        })
        .then(() => generateSessionToken())
        .then((generatedToken) => {
          token = generatedToken;
          const session = new Session(token, user);
          return session.save();
        })
        .then(() => {
          resolve({
            ...user,
            sessionToken: token,
            password: undefined,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getQuery() {
    return new Query(this.getCollectionName());
  }

  static getCollectionName() {
    return "User";
  }
}
