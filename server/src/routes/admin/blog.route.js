import express from "express";
import upload from "../../middlewares/multer.middleware.js"
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import protect from "../../middlewares/admin/auth.middleware.js";
import { createBlog, deleteBlog, getBlogById, getBlogs, updateBlog } from "../../controllers/admin/blog.controller.js";

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
  createBlog,
);

router.get("/", getBlogs);
router.get("/:id", getBlogById);

router.patch(
  "/:id",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "metaImage", maxCount: 1 },
  ]),
  validateFileSize,
  updateBlog,
);

router.delete("/:id", protect, deleteBlog);

export default router;
