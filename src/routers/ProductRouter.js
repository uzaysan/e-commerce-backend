const express = require("express");
const route = express.Router();

const {
  addProduct,
  editProduct,
  getProduct,
  deleteProduct,
} = require("../controllers/ProductController");

route.post("/", addProduct);

route.put("/:objectId", editProduct);

route.get("/:objectId", getProduct);

route.delete("/:objectId", deleteProduct);

module.exports = route;
