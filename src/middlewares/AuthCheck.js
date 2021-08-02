import Session from "../models/Session.js";

export const authCheck = (req, res, next) => {
  const sessionToken = req.headers["x-session-token"];
  if (!sessionToken) {
    req.isLoggedIn = false;
    next();
    return;
  }
  Session.getUserFromToken(sessionToken)
    .then((user) => {
      req.isLoggedIn = true;
      req.loggedInUser = user;
      next();
    })
    .catch((err) =>
      res.status(500).send({ message: `Invalid Session Token231`, err: err })
    );
};
