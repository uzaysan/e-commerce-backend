const User = require("../models/User");
const Validator = require("../util/Validator");

const registerController = (req, res) => {
  const { body } = req;
  const validatedBody = Validator.userValidator(body);

  if (!validatedBody.name) throw "name is required";
  if (!validatedBody.email) throw "email is required";
  if (!validatedBody.password) throw "password is required";
  new User(validatedBody)
    .register()
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err));
};

const loginController = (req, res) => {
  const { body } = req;

  if (!body.email) throw "email is required";
  if (!body.password) throw "password is required";
  User.login(body.email, body.password)
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err));
};

module.exports = {
  loginController,
  registerController,
};
