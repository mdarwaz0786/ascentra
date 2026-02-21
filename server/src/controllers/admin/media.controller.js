import MediaModel from "../../models/media.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

// Create media
export const createMedia = asyncHandler(async (req, res) => {
  const { title, source, date, time, link, shortDescription, status } = req.body;

  if (!title || !source || !date || !shortDescription) {
    throw new ApiError(400, "Required fields are missing");
  }

  let imagePath = null;

  try {
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "media");
    }

    const media = await MediaModel.create({
      title,
      source,
      date,
      time,
      shortDescription,
      link,
      status,
      image: imagePath,
      createdBy: req.user?._id,
    });

    const slug = await generateUniqueSlug(title, "Media", media?._id, "media");
    media.slug = slug;
    await media.save();

    return res.status(201).json({ success: true, message: "Created successfully", data: media });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    }
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

// Get all media
export const getMedia = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit, slug } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { title: { $regex: search, $options: "i" } },
      { shortDescription: { $regex: search, $options: "i" } },
      { source: { $regex: search, $options: "i" } },
    ];
  }

  if (status !== undefined) {
    filters.status = status === "true";
  }

  if (slug) {
    filters.slug = slug;
  }

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  }

  const media = await MediaModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await MediaModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: media,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get media by id
export const getMediaById = asyncHandler(async (req, res) => {
  const media = await MediaModel.findById(req.params.id);

  if (!media) {
    throw new ApiError(404, "Media not found");
  }

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: media });
});

// Update media
export const updateMedia = asyncHandler(async (req, res) => {
  const { title, source, date, time, link, shortDescription, status } = req.body;

  const media = await MediaModel.findById(req.params.id);
  if (!media) {
    throw new ApiError(404, "Media not found");
  }

  if (req.files?.image?.[0]) {
    if (media?.image && fs.existsSync(path.join(process.cwd(), media.image))) {
      fs.unlinkSync(path.join(process.cwd(), media.image));
    }
    media.image = await compressImage(req.files.image[0].buffer, "media");
  }

  if (title && title !== media.title) {
    await SlugModel.deleteOne({
      collectionName: "Media",
      documentId: media._id,
    });

    const newSlug = await generateUniqueSlug(title, "Media", media._id, "media");
    media.slug = newSlug;
  }

  media.title = title || media.title;
  media.source = source || media.source;
  media.date = date || media.date;
  media.time = time || media.time;
  media.link = link || media.link;
  media.shortDescription = shortDescription || media.shortDescription;
  media.status = typeof status === "boolean" ? status : media.status;
  media.updatedBy = req.user?._id;

  await media.save();

  return res.status(200).json({
    success: true,
    message: "Updated Successfully",
    data: media,
  });
});

// Delete media
export const deleteMedia = asyncHandler(async (req, res) => {
  const media = await MediaModel.findById(req.params.id);
  if (!media) {
    throw new ApiError(404, "Media not found");
  }

  if (media?.image && fs.existsSync(path.join(process.cwd(), media.image))) {
    fs.unlinkSync(path.join(process.cwd(), media.image));
  }

  await SlugModel.deleteOne({
    collectionName: "Media",
    documentId: media._id,
  });

  await media.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
