import express from "express";

const router = express.Router();

import CartItemController from "../controllers/CartItemController.js";
import CartItemValidator from "../validators/CartItemValidator.js";

/** Route for adding items to cart */
router.post(
  "/",
  CartItemValidator.addItemToCartValidator,
  CartItemController.addItemToCart
);

/** Route for getting the items from cart */
router.get(
  "/",
  CartItemValidator.getItemsValidator,
  CartItemController.getCartItems
);

export default router;
