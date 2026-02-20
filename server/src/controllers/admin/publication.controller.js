import PublicationModel from "../../models/publication.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

// Create publication
export const createPublication = asyncHandler(async (req, res) => {
  const { title, date, time, tags, shortDescription, fullDescription, status } = req.body;

  if (!title || !date || !shortDescription) {
    throw new ApiError(400, "Required fields are missing");
  }

  let imagePath = null;
  let bannerPath = null;

  try {
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "publication");
    }

    if (req.files?.banner?.[0]) {
      bannerPath = await compressImage(req.files.banner[0].buffer, "publication");
    }

    const publication = await PublicationModel.create({
      title,
      date,
      time,
      tags,
      shortDescription,
      fullDescription,
      status,
      image: imagePath,
      banner: bannerPath,
      createdBy: req.user?._id,
    });

    const slug = await generateUniqueSlug(title, "Publication", publication?._id, "publications");
    publication.slug = slug;
    await publication.save();

    return res.status(201).json({ success: true, message: "Created successfully", data: publication });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    }
    if (bannerPath && fs.existsSync(path.join(process.cwd(), bannerPath))) {
      fs.unlinkSync(path.join(process.cwd(), bannerPath));
    }
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

// Get all publication
export const getPublications = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { title: { $regex: search, $options: "i" } },
      { shortDescription: { $regex: search, $options: "i" } },
    ];
  }

  if (status !== undefined) {
    filters.status = status === "true";
  }

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  }

  const publications = await PublicationModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await PublicationModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: publications,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get publication by id
export const getPublicationById = asyncHandler(async (req, res) => {
  const publication = await PublicationModel.findById(req.params.id);

  if (!publication) {
    throw new ApiError(404, "Publication not found");
  }

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: publication });
});

// Update publication
export const updatePublication = asyncHandler(async (req, res) => {
  const { title, date, time, shortDescription, fullDescription, status } = req.body;

  const publication = await PublicationModel.findById(req.params.id);
  if (!publication) {
    throw new ApiError(404, "Publication not found");
  }

  if (req.files?.image?.[0]) {
    if (publication?.image && fs.existsSync(path.join(process.cwd(), publication.image))) {
      fs.unlinkSync(path.join(process.cwd(), publication.image));
    }
    publication.image = await compressImage(req.files.image[0].buffer, "publication");
  }

  if (req.files?.banner?.[0]) {
    if (publication?.banner && fs.existsSync(path.join(process.cwd(), publication.banner))) {
      fs.unlinkSync(path.join(process.cwd(), publication.banner));
    }
    publication.banner = await compressImage(req.files.banner[0].buffer, "publication");
  }

  if (title && title !== publication.title) {
    await SlugModel.deleteOne({
      collectionName: "Publication",
      documentId: publication._id,
    });

    const newSlug = await generateUniqueSlug(title, "Publication", publication._id, "publications");
    publication.slug = newSlug;
  }

  publication.title = title || publication.title;
  publication.date = date || publication.date;
  publication.time = time || publication.time;
  publication.shortDescription = shortDescription || publication.shortDescription;
  publication.fullDescription = fullDescription || publication.fullDescription;
  publication.status = typeof status === "boolean" ? status : publication.status;
  publication.updatedBy = req.user?._id;

  await publication.save();

  return res.status(200).json({
    success: true,
    message: "Updated Successfully",
    data: publication,
  });
});

// Delete publication
export const deletePublication = asyncHandler(async (req, res) => {
  const publication = await PublicationModel.findById(req.params.id);
  if (!publication) {
    throw new ApiError(404, "Publication not found");
  }

  if (publication?.image && fs.existsSync(path.join(process.cwd(), publication.image))) {
    fs.unlinkSync(path.join(process.cwd(), publication.image));
  }

  if (publication?.banner && fs.existsSync(path.join(process.cwd(), publication.banner))) {
    fs.unlinkSync(path.join(process.cwd(), publication.banner));
  }

  await SlugModel.deleteOne({
    collectionName: "Publication",
    documentId: publication._id,
  });

  await publication.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
