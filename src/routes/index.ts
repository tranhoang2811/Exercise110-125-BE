import express, { Router } from "express";
import bookRouter from "./book.route";
import advanceBookRouter from "./advance-book.route";
import uploadRouter from "./upload.route";

const router: Router = express.Router();
router.use(bookRouter);
router.use(advanceBookRouter);
router.use(uploadRouter);

export default router;
