import express from "express";
import upload from "../../middlewares/multer.middleware.js"
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import protect from "../../middlewares/admin/auth.middleware.js";
import { createMeta, deleteMeta, getMeta, getMetaById, updateMeta } from "../../controllers/admin/meta.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.fields([
    { name: "metaImage", maxCount: 1 },
  ]),
  validateFileSize,
  createMeta,
);

router.get("/", getMeta);
router.get("/:id", getMetaById);

router.patch(
  "/:id",
  protect,
  upload.fields([
    { name: "metaImage", maxCount: 1 },
  ]),
  validateFileSize,
  updateMeta,
);

router.delete("/:id", protect, deleteMeta);

export default router;
