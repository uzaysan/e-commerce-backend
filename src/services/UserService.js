import User from "../repositories/User.js";

export default class UserService {
  /**
   * This function takes a user id as parameter.
   * and returns a User document
   *
   * @param {String} objectId
   * @returns {User}
   */
  static async get(objectId) {
    return await User.getQuery().findWithId(objectId);
  }
}
