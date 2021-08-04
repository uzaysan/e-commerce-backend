import express from "express";

const router = express.Router();

import CartItemController from "../controllers/CartItemController.js";
import CartItemValidator from "../middlewares/CartItemValidator.js";

router.post(
  "/",
  CartItemValidator.addItemToCartValidator,
  CartItemController.addItemToCart
);

router.get(
  "/",
  CartItemValidator.getItemsValidator,
  CartItemController.getCartItems
);

export default router;
