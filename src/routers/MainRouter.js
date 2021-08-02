const express = require("express");
const router = express.Router();

const productRouter = require("../routers/ProductRouter");
const authRouter = require("../routers/AuthRouter");
const userRouter = require("../routers/UserRouter");
const cartItemRouter = require("../routers/CartItemRouter");

const authCheck = require("../middlewares/AuthCheck");

router.use(authCheck);

router.get("/", (req, res) => {
  res.status(404).send();
});

router.use("/product", productRouter);

router.use("/auth", authRouter);

router.use("/user", userRouter);

router.use("/cartitem", cartItemRouter);

module.exports = router;
