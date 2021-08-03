import { Router } from "express";
const router = Router();

import UserController from "../controllers/UserController.js";

router.get("/:objectId", UserController.getUser);

export default router;
