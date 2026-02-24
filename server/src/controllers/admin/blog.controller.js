import BlogModel from "../../models/blog.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

// Create blog
export const createBlog = asyncHandler(async (req, res) => {
  const { title, date, time, shortDescription, fullDescription } = req.body;

  if (!title || !date || !shortDescription) {
    throw new ApiError(400, "Required fields are missing");
  }

  let imagePath = null;
  let bannerPath = null;

  try {
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "blog");
    }

    if (req.files?.banner?.[0]) {
      bannerPath = await compressImage(req.files.banner[0].buffer, "blog");
    }

    const blog = await BlogModel.create({
      title,
      date,
      time,
      shortDescription,
      fullDescription,
      image: imagePath,
      banner: bannerPath,
      createdBy: req.user?._id,
    });

    const slug = await generateUniqueSlug(title, "Blog", blog?._id, "blogs");
    blog.slug = slug;
    await blog.save();

    return res.status(201).json({ success: true, message: "Created successfully", data: blog });
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

// Get all blogs
export const getBlogs = asyncHandler(async (req, res) => {
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

  const [blogs, total] = await Promise.all([
    BlogModel.find(filters)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),
    BlogModel.countDocuments(filters),
  ]);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: blogs,
    pagination: buildPagination({ page, limit, total }),
  });
});

// get blog by id
export const getBlogById = asyncHandler(async (req, res) => {
  const blog = await BlogModel.findById(req.params.id);

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: blog });
});

// Update blog
export const updateBlog = asyncHandler(async (req, res) => {
  const { title, date, time, shortDescription, fullDescription, status } = req.body;

  const blog = await BlogModel.findById(req.params.id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  if (req.files?.image?.[0]) {
    if (blog?.image && fs.existsSync(path.join(process.cwd(), blog.image))) {
      fs.unlinkSync(path.join(process.cwd(), blog.image));
    }
    blog.image = await compressImage(req.files.image[0].buffer, "blog");
  }

  if (req.files?.banner?.[0]) {
    if (blog?.banner && fs.existsSync(path.join(process.cwd(), blog.banner))) {
      fs.unlinkSync(path.join(process.cwd(), blog.banner));
    }
    blog.banner = await compressImage(req.files.banner[0].buffer, "blog");
  }

  if (title && title !== blog.title) {
    await SlugModel.deleteOne({
      collectionName: "Blog",
      documentId: blog._id,
    });

    const newSlug = await generateUniqueSlug(title, "Blog", blog._id, "blogs");
    blog.slug = newSlug;
  }

  blog.title = title || blog.title;
  blog.date = date || blog.date;
  blog.time = time || blog.time;
  blog.shortDescription = shortDescription || blog.shortDescription;
  blog.fullDescription = fullDescription || blog.fullDescription;
  blog.status = typeof status === "boolean" ? status : blog.status;
  blog.updatedBy = req.user?._id;

  await blog.save();

  return res.status(200).json({
    success: true,
    message: "Updated Successfully",
    data: blog,
  });
});

// Delete blog
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await BlogModel.findById(req.params.id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  if (blog?.image && fs.existsSync(path.join(process.cwd(), blog.image))) {
    fs.unlinkSync(path.join(process.cwd(), blog.image));
  }

  if (blog?.banner && fs.existsSync(path.join(process.cwd(), blog.banner))) {
    fs.unlinkSync(path.join(process.cwd(), blog.banner));
  }

  await SlugModel.deleteOne({
    collectionName: "Blog",
    documentId: blog._id,
  });

  await blog.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
