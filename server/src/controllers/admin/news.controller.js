import NewsModel from "../../models/news.model.js";
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

// Create news
export const createNews = asyncHandler(async (req, res) => {
  const {
    title,
    date,
    time,
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
      imagePath = await compressImage(req.files.image[0].buffer, "news");
    }

    if (req.files?.banner?.[0]) {
      bannerPath = await compressImage(req.files.banner[0].buffer, "news");
    }

    if (req.files?.metaImage?.[0]) {
      metaImagePath = await compressImage(req.files.metaImage[0].buffer, "meta");
    }

    const news = await NewsModel.create({
      title,
      date,
      time,
      shortDescription,
      fullDescription,
      image: imagePath,
      banner: bannerPath,
      createdBy: req.user?._id,
    });

    const slug = await generateUniqueSlug(title, "News", news?._id, "news");
    news.slug = slug;
    await news.save();

    await upsertMeta({
      pageName: "news-detail",
      metaTitle: metaTitle || title,
      metaDescription,
      metaKeywords,
      metaAuthor,
      metaImage: metaImagePath,
      slug,
      userId: req.user?._id,
    })

    return res.status(201).json({ success: true, message: "Created Successfully", data: news });
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

// Get all news
export const getNews = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit, slug } = req.query;

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

  const [news, total] = await Promise.all([
    NewsModel.find(filters)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),
    NewsModel.countDocuments(filters),
  ]);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: news,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get news by id
export const getNewsById = asyncHandler(async (req, res) => {
  const news = await NewsModel.findById(req.params.id);

  if (!news) {
    throw new ApiError(404, "News not found");
  }

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: news });
});

// Update news
export const updateNews = asyncHandler(async (req, res) => {
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

  const news = await NewsModel.findById(req.params.id);
  if (!news) {
    throw new ApiError(404, "News not found");
  }

  const meta = await MetaModel.findOne({ slug: news?.slug });

  let metaImagePath = null;
  if (req.files?.metaImage?.[0]) {
    if (meta?.metaImage && fs.existsSync(path.join(process.cwd(), meta?.metaImage))) {
      fs.unlinkSync(path.join(process.cwd(), meta?.metaImage));
    }
    metaImagePath = await compressImage(req.files.metaImage[0].buffer, "meta");
  }

  if (req.files?.image?.[0]) {
    if (news?.image && fs.existsSync(path.join(process.cwd(), news.image))) {
      fs.unlinkSync(path.join(process.cwd(), news.image));
    }
    news.image = await compressImage(req.files.image[0].buffer, "news");
  }

  if (req.files?.banner?.[0]) {
    if (news?.banner && fs.existsSync(path.join(process.cwd(), news.banner))) {
      fs.unlinkSync(path.join(process.cwd(), news.banner));
    }
    news.banner = await compressImage(req.files.banner[0].buffer, "news");
  }

  let newSlug = null;
  if (title && title !== news.title) {
    await SlugModel.deleteOne({
      collectionName: "News",
      documentId: news._id,
    });

    newSlug = await generateUniqueSlug(title, "News", news._id, "news");
    news.slug = newSlug;
  }

  news.title = title || news.title;
  news.date = date || news.date;
  news.time = time || news.time;
  news.shortDescription = shortDescription || news.shortDescription;
  news.fullDescription = fullDescription || news.fullDescription;
  news.status = typeof status === "boolean" ? status : news.status;
  news.updatedBy = req.user?._id;
  news.updatedAt = new Date();

  await news.save();

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
    data: news,
  });
});

// Delete news
export const deleteNews = asyncHandler(async (req, res) => {
  const news = await NewsModel.findById(req.params.id);
  if (!news) {
    throw new ApiError(404, "News not found");
  }

  const meta = await MetaModel.findOne({ slug: news?.slug });

  if (news?.image && fs.existsSync(path.join(process.cwd(), news.image))) {
    fs.unlinkSync(path.join(process.cwd(), news.image));
  }

  if (news?.banner && fs.existsSync(path.join(process.cwd(), news.banner))) {
    fs.unlinkSync(path.join(process.cwd(), news.banner));
  }

  if (meta?.metaImage && fs.existsSync(path.join(process.cwd(), meta?.metaImage))) {
    fs.unlinkSync(path.join(process.cwd(), meta?.metaImage));
  }

  await SlugModel.deleteOne({
    collectionName: "News",
    documentId: news._id,
  });

  await news.deleteOne();
  await meta.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
