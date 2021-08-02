const express = require("express");
const router = express.Router();

const {
  addProduct,
  editProduct,
  getProduct,
  deleteProduct,
} = require("../controllers/ProductController");

router.post("/", addProduct);

router.put("/:objectId", editProduct);

router.get("/:objectId", getProduct);

router.delete("/:objectId", deleteProduct);

module.exports = router;
