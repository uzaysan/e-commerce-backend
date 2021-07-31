const express = require("express");

const route = express.Router();

const {
  loginController,
  registerController,
} = require("../controllers/AuthController");

route.get("/login", loginController);

route.post("/register", registerController);

module.exports = route;
