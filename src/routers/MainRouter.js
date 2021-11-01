import express from "express";
const router = express.Router();

import productRouter from "./ProductRouter.js";
import authRouter from "./AuthRouter.js";
import userRouter from "./UserRouter.js";
import cartItemRouter from "./CartItemRouter.js";
import fileRouter from "./FileRouter.js";
import searchRouter from "./SearchRouter.js";

import AuthValidator from "../validators/AuthValidator.js";

router.use(AuthValidator.authCheck);

router.use("/product", productRouter);

router.use("/auth", authRouter);

router.use("/user", userRouter);

router.use("/cartitem", cartItemRouter);

router.use("/file", fileRouter);

router.use("/search", searchRouter);

export default router;
