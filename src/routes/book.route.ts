import express, { Router } from "express";
import cors from "cors";
import {
  list,
  detail,
  create,
  replace,
  remove,
} from "../controllers/book.controller";

const router: Router = express.Router();

router.get("/books", cors(), list);
router.get("/books/:id", cors(), detail);
router.post("/books", cors(), create);
router.put("/books/:id", cors(), replace);
router.delete("/books/:id", cors(), remove);

export default router;
