import express from "express";
import protect from "../../middlewares/admin/auth.middleware.js";
import { createContact, deleteContact, getContactById, getContacts, updateContact } from "../../controllers/admin/contact.controller.js";

const router = express.Router();

router.post(
  "/",
  createContact,
);

router.get("/", protect, getContacts);
router.get("/:id", protect, getContactById);

router.patch(
  "/:id",
  protect,
  updateContact,
);

router.delete("/:id", protect, deleteContact);

export default router;
