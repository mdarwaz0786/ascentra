import NewsModel from "../../models/news.model.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";
import ApiError from "../../helpers/apiError.js";

// Get all news
export const getNews = asyncHandler(async (req, res) => {
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

  const [news, total] = await Promise.all([
    NewsModel.find(filters)
      .sort(sortOption)
      .limit(cumulativeLimit)
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

// get news by slug
export const getNewsBySlug = asyncHandler(async (req, res) => {
  const news = await NewsModel.findOne({ slug: req.params.slug });

  if (!news) {
    throw new ApiError(404, "News not found");
  }

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: news });
});