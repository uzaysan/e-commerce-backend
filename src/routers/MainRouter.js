import express from "express";
const router = express.Router();

import productRouter from "../routers/ProductRouter.js";
import authRouter from "../routers/AuthRouter.js";
import userRouter from "../routers/UserRouter.js";
import cartItemRouter from "../routers/CartItemRouter.js";
import fileRouter from "../routers/FileRouter.js";

import AuthValidator from "../validators/AuthValidator.js";

router.use(AuthValidator.authCheck);

router.use("/product", productRouter);

router.use("/auth", authRouter);

router.use("/user", userRouter);

router.use("/cartitem", cartItemRouter);

router.use("/file", fileRouter);

export default router;
