import { Router } from "express";
const router = Router();

import { getUser } from "../controllers/UserController.js";

router.get("/:objectId", getUser);

export default router;
