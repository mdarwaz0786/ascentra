import express from "express";
import { createContact } from "../../controllers/user/contact.controller.js";

const router = express.Router();

router.post("/", createContact);

export default router;
