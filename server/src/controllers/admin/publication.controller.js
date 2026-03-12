import PublicationModel from "../../models/publication.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";
import { upsertMeta } from "../../utils/meta.js";
import MetaModel from "../../models/meta.model.js";

// Create publication
export const createPublication = asyncHandler(async (req, res) => {
  const {
    title,
    date,
    time,
    tags,
    shortDescription,
    fullDescription,
    metaTitle,
    metaDescription,
    metaKeywords,
    metaAuthor,
  } = req.body;

  if (!title || !date || !shortDescription) {
    throw new ApiError(400, "Required fields are missing");
  }

  let imagePath = null;
  let bannerPath = null;
  let metaImagePath = null;

  try {
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "publication");
    }

    if (req.files?.banner?.[0]) {
      bannerPath = await compressImage(req.files.banner[0].buffer, "publication");
    }

    if (req.files?.metaImage?.[0]) {
      metaImagePath = await compressImage(req.files.metaImage[0].buffer, "meta");
    }

    const publication = await PublicationModel.create({
      title,
      date,
      time,
      tags,
      shortDescription,
      fullDescription,
      image: imagePath,
      banner: bannerPath,
      createdBy: req.user?._id,
    });

    const slug = await generateUniqueSlug(title, "Publication", publication?._id, "publications");
    publication.slug = slug;
    await publication.save();

    await upsertMeta({
      pageName: "publication-detail",
      metaTitle: metaTitle || title,
      metaDescription,
      metaKeywords,
      metaAuthor,
      metaImage: metaImagePath,
      slug,
      userId: req.user?._id,
    });

    return res.status(201).json({ success: true, message: "Created successfully", data: publication });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    }
    if (bannerPath && fs.existsSync(path.join(process.cwd(), bannerPath))) {
      fs.unlinkSync(path.join(process.cwd(), bannerPath));
    }
    if (metaImagePath && fs.existsSync(path.join(process.cwd(), metaImagePath))) {
      fs.unlinkSync(path.join(process.cwd(), metaImagePath));
    }
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

// Get all publication
export const getPublications = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, slug, limit } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { title: { $regex: search, $options: "i" } },
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

  const [publications, total] = await Promise.all([
    PublicationModel.find(filters)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),
    PublicationModel.countDocuments(filters),
  ]);

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

  const meta = await MetaModel.findOne({
    slug: publication?.slug,
    pageName: "publication-detail",
  });

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: { ...publication.toObject(), meta } });
});

// Update publication
export const updatePublication = asyncHandler(async (req, res) => {
  const {
    title,
    date,
    time,
    shortDescription,
    fullDescription,
    status,
    metaTitle,
    metaDescription,
    metaKeywords,
    metaAuthor,
  } = req.body;

  const publication = await PublicationModel.findById(req.params.id);
  if (!publication) {
    throw new ApiError(404, "Publication not found");
  }

  const meta = await MetaModel.findOne({ slug: publication?.slug });

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

  let metaImagePath = null;
  if (req.files?.metaImage?.[0]) {
    if (meta?.metaImage && fs.existsSync(path.join(process.cwd(), meta?.metaImage))) {
      fs.unlinkSync(path.join(process.cwd(), meta?.metaImage));
    }
    metaImagePath = await compressImage(req.files.metaImage[0].buffer, "meta");
  }

  let newSlug = null;
  if (title && title !== publication.title) {
    await SlugModel.deleteOne({
      collectionName: "Publication",
      documentId: publication._id,
    });

    newSlug = await generateUniqueSlug(title, "Publication", publication._id, "publications");
    publication.slug = newSlug;
  }

  publication.title = title || publication.title;
  publication.date = date || publication.date;
  publication.time = time || publication.time;
  publication.shortDescription = shortDescription || publication.shortDescription;
  publication.fullDescription = fullDescription || publication.fullDescription;
  publication.status = typeof status === "boolean" ? status : publication.status;
  publication.updatedBy = req.user?._id;
  publication.updatedAt = new Date();

  await publication.save();

  await upsertMeta({
    metaTitle,
    metaDescription,
    metaKeywords,
    metaAuthor,
    metaImage: metaImagePath,
    slug: newSlug,
    userId: req.user?._id,
  });

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

  const meta = await MetaModel.findOne({ slug: publication?.slug });

  if (publication?.image && fs.existsSync(path.join(process.cwd(), publication.image))) {
    fs.unlinkSync(path.join(process.cwd(), publication.image));
  }

  if (publication?.banner && fs.existsSync(path.join(process.cwd(), publication.banner))) {
    fs.unlinkSync(path.join(process.cwd(), publication.banner));
  }

  if (meta?.metaImage && fs.existsSync(path.join(process.cwd(), meta?.metaImage))) {
    fs.unlinkSync(path.join(process.cwd(), meta?.metaImage));
  }

  await SlugModel.deleteOne({
    collectionName: "Publication",
    documentId: publication._id,
  });

  await publication.deleteOne();
  await meta.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
