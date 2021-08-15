import express from "express";

const router = express.Router();

import AuthController from "../controllers/AuthController.js";
import AuthValidator from "../validators/AuthValidator.js";

router.get(
  "/login",
  AuthValidator.loginValidator,
  AuthController.loginController
);

router.post(
  "/register",
  AuthValidator.registerValidator,
  AuthController.registerController
);

export default router;
