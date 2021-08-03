import express from "express";
import multer from "multer";
import { uploadFile, getFile } from "../controllers/FileController.js";

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("file"), uploadFile);

router.get("/:filename", getFile);

export default router;
