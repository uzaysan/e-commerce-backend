import User from "../models/User.js";

export default class UserController {
  static async getUser(req, res) {
    const { params } = req;
    if (!params.objectId) {
      res.status(400).send("url must include user id");
      return;
    }
    try {
      const user = await User.getQuery().findWithId(params.objectId);
      if (user) res.send(user);
      else res.status(400).send("User doesnt exist");
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
