import PublicationModel from "../../models/publication.model.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";
import ApiError from "../../helpers/apiError.js";

// Get all publications
export const getPublications = asyncHandler(async (req, res) => {
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

  const [publications, total] = await Promise.all([
    PublicationModel.find(filters)
      .sort(sortOption)
      .limit(cumulativeLimit)
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

// get publication by slug
export const getPublicationBySlug = asyncHandler(async (req, res) => {
  const publication = await PublicationModel.findOne({ slug: req.params.slug });

  if (!publication) {
    throw new ApiError(404, "Publication not found");
  }

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: publication });
});