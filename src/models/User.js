const database = require("../controllers/DatabaseController").database;
const users = database.collection("User");
const Query = require("../Query");
const Auth = require("../Auth");
const Session = require("../models/Session");
const { generateObjectId } = require("../util/ObjectIdUtils");
const { generateSessionToken } = require("../util/SessionUtil");

class User {
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
        .find()
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
          const session = new Session(token, user._id);
          return session.save();
        })
        .then((result) => {
          console.log("Result", result);
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
      Auth.encryptPassword(user.password)
        .then((encryptedPassword) => {
          console.log("encrypted pass", encryptedPassword);
          user.password = encryptedPassword;
          users
            .insertOne(user)
            .then((result) => {
              resolve(result);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getQuery() {
    return new Query("User");
  }
}

module.exports = User;
