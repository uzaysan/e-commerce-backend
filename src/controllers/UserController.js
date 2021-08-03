import UserService from "../services/UserService.js";

export default class UserController {
  static async getUser(req, res) {
    const { params } = req;
    try {
      if (!params.objectId) {
        res.status(400).send("url must include user id");
        return;
      }
      res.send(await UserService.get(params.objectId));
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
