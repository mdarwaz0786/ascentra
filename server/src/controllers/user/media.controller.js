import MediaModel from "../../models/media.model.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";
import ApiError from "../../helpers/apiError.js";

// Get all media
export const getMedia = asyncHandler(async (req, res) => {
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

  const [mediaItems, total] = await Promise.all([
    MediaModel.find(filters)
      .sort(sortOption)
      .limit(cumulativeLimit)
      .lean(),
    MediaModel.countDocuments(filters),
  ]);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: mediaItems,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get media by slug
export const getMediaBySlug = asyncHandler(async (req, res) => {
  const mediaItem = await MediaModel.findOne({ slug: req.params.slug });

  if (!mediaItem) {
    throw new ApiError(404, "Media not found");
  }

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: mediaItem });
});