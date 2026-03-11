import express from "express";
import upload from "../../middlewares/multer.middleware.js"
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import protect from "../../middlewares/admin/auth.middleware.js";
import { createNews, deleteNews, getNews, getNewsById, updateNews } from "../../controllers/admin/news.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "metaImage", maxCount: 1 },
  ]),
  validateFileSize,
  createNews,
);

router.get("/", getNews);
router.get("/:id", getNewsById);

router.patch(
  "/:id",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "metaImage", maxCount: 1 },
  ]),
  validateFileSize,
  updateNews,
);

router.delete("/:id", protect, deleteNews);

export default router;
