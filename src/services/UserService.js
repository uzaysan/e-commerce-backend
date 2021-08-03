export default class UserService {
  static async get(objectId) {
    return await User.getQuery().findWithId(objectId);
  }
}
