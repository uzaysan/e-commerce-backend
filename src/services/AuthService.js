import bcrypt from "@node-rs/bcrypt";
import { generateSessionToken } from "../util/SessionUtil.js";
import User from "../repositories/User.js";
import Session from "../repositories/Session.js";

const cost = 10;

export default class AuthService {
  static async login(email, password) {
    const query = User.getQuery();
    query.equalTo("email", email);
    const user = await query.findOne({
      projection: { password: 1, name: 1, email: 1 },
    });
    const isValid = await AuthService.comparePasswords(password, user.password);
    if (!isValid) throw new Error("Invalid credentials");
    const token = await generateSessionToken();
    await new Session(token, user).save();
    return { ...user, sessionToken: token, password: undefined };
  }

  static async register(body) {
    return await new User(body).register();
  }

  static async encryptPassword(password) {
    return await bcrypt.hash(password, cost);
  }

  static async comparePasswords(password, hash) {
    return await bcrypt.verify(password, hash);
  }
}
