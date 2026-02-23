import BlogModel from "../../models/blog.model.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";
import ApiError from "../../helpers/apiError.js";

// Get all blogs
export const getBlogs = asyncHandler(async (req, res) => {
  let {
    search,
    sort = "desc",
    page = 1,
    limit = 10,
    slug,
  } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  const filters = {};

  if (search) {
    filters.$or = [
      { title: { $regex: search, $options: "i" } },
    ];
  }

  filters.status = true;

  if (slug) {
    filters.slug = slug;
  }

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const cumulativeLimit = page * limit;

  const blogs = await BlogModel.find(filters)
    .sort(sortOption)
    .limit(cumulativeLimit)
    .lean();

  if (!blogs) {
    throw new ApiError(404, "Blogs not found");
  }

  const total = await BlogModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Blogs fetched successfully",
    data: blogs,
    pagination: buildPagination({ page, limit, total }),
  });
});

// get blog by slug
export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await BlogModel.findOne({ slug: req.params.slug });

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: blog });
});