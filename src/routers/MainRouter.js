const express = require("express");
const router = express.Router();

const productRouter = require("../routers/ProductRouter");

router.get("/", (req, res) => {
  res.status(404).send();
});

router.use("/product", productRouter);

module.exports = router;
