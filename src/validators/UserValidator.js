export default class UserValidator {
  static getUserValidator(req, res, next) {
    const errors = [];
    if (!req.params.objectId) errors.push("Url must include user id");
    if (errors.length > 0) req.errors = errors;
    next();
  }
}
