import express from "express";
import upload from "../../middlewares/multer.middleware.js"
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import protect from "../../middlewares/admin/auth.middleware.js";
import { createPublication, deletePublication, getPublicationById, getPublications, updatePublication } from "../../controllers/admin/publication.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  validateFileSize,
  createPublication,
);

router.get("/", getPublications);
router.get("/:id", getPublicationById);

router.patch(
  "/:id",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  validateFileSize,
  updatePublication,
);

router.delete("/:id", protect, deletePublication);

export default router;
