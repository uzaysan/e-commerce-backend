import express from "express";
import ProductValidator from "../middlewares/ProductValidator.js";

const router = express.Router();

import ProductController from "../controllers/ProductController.js";

router.post(
  "/",
  ProductValidator.addProductValidator,
  ProductController.addProductController
);

router.put(
  "/:objectId",
  ProductValidator.editProductValidator,
  ProductController.editProductController
);

router.get(
  "/:objectId",
  ProductValidator.getProductValidator,
  ProductController.getProductController
);

router.delete(
  "/:objectId",
  ProductValidator.deleteProductValidator,
  ProductController.deleteProductController
);

export default router;
