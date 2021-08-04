import Session from "../repositories/Session.js";

export default class AuthValidator {
  static async authCheck(req, res, next) {
    const sessionToken = req.headers["x-session-token"];
    if (!sessionToken) {
      req.isLoggedIn = false;
      next();
      return;
    }
    try {
      const user = await Session.getUserFromToken(sessionToken);
      req.isLoggedIn = true;
      req.loggedInUser = user;
      next();
    } catch (err) {
      next();
    }
  }

  static registerValidator(req, res, next) {
    const body = AuthValidator.trimBody(req.body);
    const errors = [];
    if (!body.name) errors.push("name is required");
    if (!body.email) errors.push("email is required");
    if (!body.password) errors.push("password is required");
    req.body = body;
    if (errors.length > 0) req.errors = errors;
    next();
  }

  static loginValidator(req, res, next) {
    const body = req.body;
    const errors = [];
    if (!body.email) errors.push("email is required");
    if (!body.password) errors.push("password is required");
    if (errors.length > 0) req.errors = errors;
    next();
  }

  static trimBody(body) {
    const newBody = {};
    if (body._id) newBody._id = body._id;
    if (body.name) newBody.name = body.name;
    if (body.email) newBody.email = body.email;
    if (body.password) newBody.password = body.password;
    return newBody;
  }
}
