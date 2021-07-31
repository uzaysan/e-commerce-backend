const bcrypt = require("@node-rs/bcrypt");
const cost = 10;

class Auth {
  static encryptPassword(password) {
    return bcrypt.hash(password, cost);
  }

  static comparePasswords(password, hash) {
    return bcrypt.verify(password, hash);
  }
}

module.exports = Auth;
