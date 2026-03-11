import express from "express";
import { getMeta } from "../../controllers/user/meta.controller.js";

const router = express.Router();

router.get("/", getMeta);

export default router;
