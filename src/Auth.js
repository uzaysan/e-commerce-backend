import bcrypt from "@node-rs/bcrypt";
const cost = 10;

class Auth {
  static async encryptPassword(password) {
    return await bcrypt.hash(password, cost);
  }

  static async comparePasswords(password, hash) {
    return await bcrypt.verify(password, hash);
  }
}

export default Auth;
