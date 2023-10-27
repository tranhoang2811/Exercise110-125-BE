import express, { Router } from "express";
import cors from "cors";
import {
  list,
  detail,
  create,
  replace,
  remove,
  getCoverImage,
  uploadCoverImage,
} from "../controllers/advance-book.controller";

const router: Router = express.Router();

router.get("/advance-books", cors(), list);
router.get("/advance-books/:id", cors(), detail);
router.post("/advance-books", cors(), create);
router.put("/advance-books/:id", cors(), replace);
router.delete("/advance-books/:id", cors(), remove);
router.get("/advance-books/cover-image/:fileName", cors(), getCoverImage);
router.post("/advance-books/cover-image", cors(), uploadCoverImage);

export default router;
