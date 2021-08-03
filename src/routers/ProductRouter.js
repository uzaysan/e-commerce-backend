import express from "express";
const router = express.Router();

import ProductController from "../controllers/ProductController.js";

router.post("/", ProductController.addProduct);

router.put("/:objectId", ProductController.editProduct);

router.get("/:objectId", ProductController.getProduct);

router.delete("/:objectId", ProductController.deleteProduct);

export default router;
