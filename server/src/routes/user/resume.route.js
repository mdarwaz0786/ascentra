import express from "express";
import upload from "../../middlewares/multer.middleware.js"
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import { createResume } from "../../controllers/user/resume.controller.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "resume", maxCount: 1 },
  ]),
  validateFileSize,
  createResume,
);

export default router;
