import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";
import MetaModel from "../../models/meta.model.js";

// Create meta
export const createMeta = asyncHandler(async (req, res) => {
  const {
    pageName,
    metaTitle,
    metaDescription,
    metaKeywords,
    metaAuthor,
  } = req.body;

  let metaImagePath = null;

  try {
    const existingMeta = await MetaModel.findOne({ pageName });

    if (existingMeta) {
      throw new ApiError(404, `${pageName} page meta has already exists`);
    }

    if (req.files?.metaImage?.[0]) {
      metaImagePath = await compressImage(req.files.metaImage[0].buffer, "meta");
    }

    const meta = await MetaModel.create({
      pageName,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaAuthor,
      metaImage: metaImagePath,
      createdBy: req.user?._id,
    });

    const slug = await generateUniqueSlug(metaTitle, "Meta", meta?._id, "meta");
    meta.slug = slug;
    await meta.save();

    return res.status(201).json({ success: true, message: "Created successfully", data: meta });
  } catch (error) {
    if (metaImagePath && fs.existsSync(path.join(process.cwd(), metaImagePath))) {
      fs.unlinkSync(path.join(process.cwd(), metaImagePath));
    }
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

// Get all meta
export const getMeta = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit, slug, pageName } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { metaTitle: { $regex: search, $options: "i" } },
      { pageName: { $regex: search, $options: "i" } },
    ];
  }

  if (status !== undefined) {
    filters.status = status === "true";
  }

  if (slug) {
    filters.slug = slug;
  }

  if (pageName) {
    filters.pageName = pageName;
  }

  filters.pageName = {
    $nin: [
      "news-detail",
      "blog-detail",
      "publication-detail",
      "media-detail",
    ],
  };

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  }

  const [meta, total] = await Promise.all([
    MetaModel.find(filters)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),
    MetaModel.countDocuments(filters),
  ]);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: meta,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get meta by id
export const getMetaById = asyncHandler(async (req, res) => {
  const meta = await MetaModel.findById(req.params.id);

  if (!meta) {
    throw new ApiError(404, "Meta not found");
  }

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: meta });
});

// Update meta
export const updateMeta = asyncHandler(async (req, res) => {
  const {
    status,
    metaTitle,
    metaDescription,
    metaKeywords,
    metaAuthor,
    pageName,
  } = req.body;

  const meta = await MetaModel.findById(req.params.id);
  if (!meta) {
    throw new ApiError(404, "Meta not found");
  }

  const existingMeta = await MetaModel.findOne({ pageName, _id: { $ne: meta?._id } });

  if (existingMeta) {
    throw new ApiError(404, `${pageName} page meta has already exists`);
  }

  if (req.files?.metaImage?.[0]) {
    if (meta?.metaImage && fs.existsSync(path.join(process.cwd(), meta?.metaImage))) {
      fs.unlinkSync(path.join(process.cwd(), meta?.metaImage));
    }
    meta.metaImage = await compressImage(req.files.metaImage[0].buffer, "meta");
  }

  if (metaTitle && metaTitle !== meta?.metaTitle) {
    await SlugModel.deleteOne({
      collectionName: "Meta",
      documentId: meta?._id,
    });

    const newSlug = await generateUniqueSlug(metaTitle, "Meta", meta?._id, "meta");
    meta.slug = newSlug;
  }

  meta.pageName = pageName || meta?.pageName;
  meta.metaTitle = metaTitle || meta?.metaTitle;
  meta.metaDescription = metaDescription || meta?.metaDescription;
  meta.metaKeywords = metaKeywords || meta?.metaKeywords;
  meta.metaAuthor = metaAuthor || meta?.metaAuthor;
  meta.status = typeof status === "boolean" ? status : meta.status;
  meta.updatedBy = req.user?._id;
  meta.updatedAt = new Date();

  await meta.save();

  return res.status(200).json({
    success: true,
    message: "Updated Successfully",
    data: meta
  });
});

// Delete meta
export const deleteMeta = asyncHandler(async (req, res) => {
  const meta = await MetaModel.findById(req.params.id);
  if (!meta) {
    throw new ApiError(404, "Meta not found");
  }

  if (meta?.metaImage && fs.existsSync(path.join(process.cwd(), meta?.metaImage))) {
    fs.unlinkSync(path.join(process.cwd(), meta?.metaImage));
  }

  await SlugModel.deleteOne({
    collectionName: "Meta",
    documentId: meta?._id,
  });

  await meta.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
