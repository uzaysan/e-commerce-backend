import express from "express";
import multer from "multer";
import FileController from "../controllers/FileController.js";

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("file"), FileController.uploadFile);

router.get("/:filename", FileController.getFile);

export default router;
