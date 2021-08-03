import express from "express";

const router = express.Router();

import CartItemController from "../controllers/CartItemController.js";

router.post("/", CartItemController.addItemToCart);

router.get("/", CartItemController.getCartItems);

export default router;
