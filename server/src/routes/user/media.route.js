import express from "express";
import { getMedia, getMediaBySlug } from "../../controllers/user/media.controller.js";

const router = express.Router();

router.get("/", getMedia);
router.get("/:slug", getMediaBySlug);

export default router;
