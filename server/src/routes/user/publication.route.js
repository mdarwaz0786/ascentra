import express from "express";
import { getPublicationBySlug, getPublications } from "../../controllers/user/publication.controller.js";

const router = express.Router();

router.get("/", getPublications);
router.get("/:slug", getPublicationBySlug);

export default router;
