import express from "express";
import { getNews, getNewsBySlug } from "../../controllers/user/news.controller.js";

const router = express.Router();

router.get("/", getNews);
router.get("/:slug", getNewsBySlug);

export default router;
