import express from "express";

const router = express.Router();

import AuthController from "../controllers/AuthController.js";

router.get("/login", AuthController.loginController);

router.post("/register", AuthController.registerController);

export default router;
