import express from "express";
import authRoute from "./auth.route.js";
import newsRoute from "./news.route.js";
import blogRoute from "./blog.route.js";
import mediaRoute from "./media.route.js";
import publicationRoute from "./publication.route.js";
import dashboardRoute from "./dashboard.route.js";
import contactRoute from "./contact.route.js";
import resumeRoute from "./resume.route.js";
import metaRoute from "./meta.route.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/news", newsRoute);
router.use("/blogs", blogRoute);
router.use("/medias", mediaRoute);
router.use("/publications", publicationRoute);
router.use("/dashboard", dashboardRoute);
router.use("/contact", contactRoute);
router.use("/resume", resumeRoute);
router.use("/meta", metaRoute);

export default router;