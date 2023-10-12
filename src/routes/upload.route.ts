import express, { Router } from "express";
import cors from "cors";
import { getImage, uploadMultipleFiles, uploadSingleFile } from "../controllers/upload.controller";

const router: Router = express.Router();

router.post("/upload/single", uploadSingleFile)
router.post("/upload/multiple", uploadMultipleFiles)
router.get("/upload/image/:fileName", cors(), getImage)

export default router;