import express from "express";
import protect from "../../middlewares/admin/auth.middleware.js";
import { getDashboardStats } from "../../controllers/admin/dashboard.controller.js";

const router = express.Router();

router.get("/", protect, getDashboardStats);

export default router;
