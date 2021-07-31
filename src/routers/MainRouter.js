const express = require("express");
const router = express.Router();

const productRouter = require("../routers/ProductRouter");
const authRouter = require("../routers/AuthRouter");

router.get("/", (req, res) => {
  res.status(404).send();
});

router.use("/product", productRouter);

router.use("/auth", authRouter);

module.exports = router;
