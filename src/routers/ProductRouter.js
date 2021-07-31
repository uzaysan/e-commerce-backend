const express = require("express");
const route = express.Router();

const {
  addProduct,
  editProduct,
  getProduct,
} = require("../controllers/ProductController");

route.post("/addProduct", addProduct);

route.post("/editProduct/:objectId", editProduct);

route.get("/:objectId", getProduct);

module.exports = route;
