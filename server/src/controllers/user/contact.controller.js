import ContactModel from "../../models/contact.model.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// ================= CREATE CONTACT =================
export const createContact = asyncHandler(async (req, res) => {
  const { name, email, mobile, subject, message } = req.body;

  const contact = await ContactModel.create({
    name,
    email,
    mobile,
    subject,
    message,
  });

  return res.status(201).json({
    success: true,
    message: "Contact submitted successfully",
    data: contact,
  });
});
