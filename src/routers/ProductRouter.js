import { Router } from "express";
const router = Router();

import {
  addProduct,
  editProduct,
  getProduct,
  deleteProduct,
} from "../controllers/ProductController.js";

router.post("/", addProduct);

router.put("/:objectId", editProduct);

router.get("/:objectId", getProduct);

router.delete("/:objectId", deleteProduct);

export default router;
