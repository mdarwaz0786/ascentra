import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import MetaModel from "../../models/meta.model.js";

// Get meta by pageName / slug
export const getMeta = asyncHandler(async (req, res) => {
  const { slug, pageName } = req.query;

  const filter = {};

  if (slug) {
    filter.slug = slug;
  }

  if (pageName) {
    filter.pageName = pageName;
  }

  if (!slug && !pageName) {
    throw new ApiError(400, "Provide slug or pageName");
  }

  const meta = await MetaModel.findOne(filter);

  if (!meta) {
    throw new ApiError(404, "Meta not found");
  }

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: meta,
  });
});