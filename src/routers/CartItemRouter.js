import express from "express";

const router = express.Router();

import {
  addItemToCart,
  getCartItems,
} from "../controllers/CartItemController.js";

router.post("/", addItemToCart);

router.get("/", getCartItems);

export default router;
