const express = require("express");
const router = express.Router();

const { addItemToCart } = require("../controllers/CartItemController");

router.post("/", addItemToCart);

module.exports = router;
