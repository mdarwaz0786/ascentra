import express from "express";
import upload from "../../middlewares/multer.middleware.js"
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import protect from "../../middlewares/admin/auth.middleware.js";
import { createMedia, deleteMedia, getMedia, getMediaById, updateMedia } from "../../controllers/admin/media.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
  ]),
  validateFileSize,
  createMedia,
);

router.get("/", getMedia);
router.get("/:id", getMediaById);

router.patch(
  "/:id",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
  ]),
  validateFileSize,
  updateMedia,
);

router.delete("/:id", protect, deleteMedia);

export default router;
