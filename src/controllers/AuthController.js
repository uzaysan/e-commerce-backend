import MailAdapter from "../adapters/MailAdapter.js";
import AuthService from "../services/AuthService.js";

export default class AuthController {
  static async registerController(req, res) {
    const { body, errors } = req;
    try {
      if (errors) throw new Error({ errors: errors });
      res.send(await AuthService.register(body));
      MailAdapter.sendMail(
        body.email,
        `Welcome ${body.name}`,
        "Welcome to E-Commerce!"
      );
    } catch (err) {
      res.status(500).send({ err: err.toString() });
    }
  }

  static async loginController(req, res) {
    const { body, errors } = req;
    try {
      if (errors) throw new Error({ errors: errors });
      res.send(await AuthService.login(body.email, body.password));
    } catch (err) {
      res.status(500).send({ err: err.toString() });
    }
  }
}
