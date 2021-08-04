import { Router } from "express";
const router = Router();

import UserController from "../controllers/UserController.js";
import UserValidator from "../middlewares/UserValidator.js";

router.get(
  "/:objectId",
  UserValidator.getUserValidator,
  UserController.getUser
);

export default router;
