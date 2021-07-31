const Error = require("./Error");

const mongoErrorConverter = (err) => {
  return new Error(err);
};

module.exports = {
  mongoErrorConverter,
};
