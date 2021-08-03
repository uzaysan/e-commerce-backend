import Validator from "../util/Validator.js";
import MailAdapter from "../adapters/MailAdapter.js";
import AuthService from "../services/AuthService.js";

export default class AuthController {
  static async registerController(req, res) {
    const { body } = req;
    const validatedBody = Validator.userValidator(body);
    try {
      if (!validatedBody.name) throw "name is required";
      if (!validatedBody.email) throw "email is required";
      if (!validatedBody.password) throw "password is required";

      res.send(await AuthService.register(validatedBody));
      MailAdapter.sendMail(
        validatedBody.email,
        `Welcome ${validatedBody.name}`,
        "Welcome to E-Commerce!"
      );
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async loginController(req, res) {
    const { body } = req;
    try {
      if (!body.email) throw "email is required";
      if (!body.password) throw "password is required";

      res.send(await AuthService.login(body.email, body.password));
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
