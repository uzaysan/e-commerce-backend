import Session from "../repositories/Session.js";

export const authCheck = async (req, res, next) => {
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
};
