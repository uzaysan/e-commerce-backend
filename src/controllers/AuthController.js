import User from "../models/User.js";
import Validator from "../util/Validator.js";
import MailAdapter from "../adapters/MailAdapter.js";

export default class AuthController {
  static async registerController(req, res) {
    const { body } = req;
    const validatedBody = Validator.userValidator(body);

    if (!validatedBody.name) throw "name is required";
    if (!validatedBody.email) throw "email is required";
    if (!validatedBody.password) throw "password is required";
    try {
      const user = await new User(validatedBody).register();
      res.send(user);
      MailAdapter.sendMail(
        validatedBody.email,
        `Welcome ${validatedBody.name}`,
        "Welcome to E-Commerce!"
      );
    } catch (err) {
      console.log("Auth Error", err);
      res.status(500).send(err);
    }
  }

  static async loginController(req, res) {
    const { body } = req;

    if (!body.email) throw "email is required";
    if (!body.password) throw "password is required";

    try {
      const user = await User.login(body.email, body.password);
      res.send(user);
    } catch (err) {
      console.log("Login err", err);
      res.status(500).send(err);
    }
  }
}
