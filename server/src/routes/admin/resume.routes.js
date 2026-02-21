import express from "express";
import upload from "../../middlewares/multer.middleware.js"
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import protect from "../../middlewares/admin/auth.middleware.js";
import { createResume, deleteResume, getResumeById, getResumes, updateResume } from "../../controllers/admin/resume.controller.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "resume", maxCount: 1 },
  ]),
  validateFileSize,
  createResume,
);

router.get("/", protect, getResumes);
router.get("/:id", protect, getResumeById);

router.patch(
  "/:id",
  protect,
  upload.fields([
    { name: "resume", maxCount: 1 },
  ]),
  validateFileSize,
  updateResume,
);

router.delete("/:id", protect, deleteResume);

export default router;
