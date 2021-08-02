import express from "express";

const router = express.Router();

import { addItemToCart } from "../controllers/CartItemController.js";

router.post("/", addItemToCart);

export default router;
