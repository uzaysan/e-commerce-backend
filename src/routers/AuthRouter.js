import express from "express";

const router = express.Router();

import {
  loginController,
  registerController,
} from "../controllers/AuthController.js";

router.get("/login", loginController);

router.post("/register", registerController);

export default router;
