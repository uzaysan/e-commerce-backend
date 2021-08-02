const User = require("../models/User");

const getUser = (req, res) => {
  const { params } = req;
  if (!params.objectId) {
    throw `_id field necessary to get a user`;
  }
  User.getQuery()
    .findWithId(params.objectId)
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send(err));
};

module.exports = {
  getUser,
};
