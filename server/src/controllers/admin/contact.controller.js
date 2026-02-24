import ContactModel from "../../models/contact.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// ================= CREATE CONTACT =================
export const createContact = asyncHandler(async (req, res) => {
  const { name, email, mobile, subject, message } = req.body;

  if (!name || !email || !message) {
    throw new ApiError(400, "Required fields are missing");
  }

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

// ================= GET ALL CONTACTS =================
export const getContacts = asyncHandler(async (req, res) => {
  let {
    search,
    status,
    sort = "desc",
    page = 1,
    limit = 10,
  } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;

  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { mobile: { $regex: search, $options: "i" } },
    ];
  }

  if (status !== undefined) {
    filters.status = status === "true";
  }

  const sortOption = {
    createdAt: sort === "asc" ? 1 : -1,
  };

  const [contacts, total] = await Promise.all([
    ContactModel.find(filters)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),
    ContactModel.countDocuments(filters),
  ]);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: contacts,
    pagination: buildPagination({ page, limit, total }),
  });
});

// ================= GET CONTACT BY ID =================
export const getContactById = asyncHandler(async (req, res) => {
  const contact = await ContactModel.findById(req.params.id);

  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: contact,
  });
});

// ================= UPDATE CONTACT =================
export const updateContact = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const contact = await ContactModel.findById(req.params.id);
  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  if (status !== undefined) contact.status = status === "true" || status === true;

  await contact.save();

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: contact,
  });
});

// ================= DELETE CONTACT =================
export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await ContactModel.findById(req.params.id);

  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  await contact.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
