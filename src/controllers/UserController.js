import UserService from "../services/UserService.js";

export default class UserController {
  static async getUser(req, res) {
    const { params, errors } = req;
    try {
      if (errors) throw new Error({ errors: errors });
      res.send(await UserService.get(params.objectId));
    } catch (err) {
      console.log(err);
      res.status(500).send(err.toString());
    }
  }
}
