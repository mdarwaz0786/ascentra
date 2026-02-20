import express from "express";
import { getLoggedInUser, login, signup } from "../../controllers/admin/auth.controller.js";
import protect from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/loggedIn", protect, getLoggedInUser);

export default router;
