import express from "express";
import multer from "multer";
import { fileController } from "../controllers/FileController.js";

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("file"), fileController);

export default router;
