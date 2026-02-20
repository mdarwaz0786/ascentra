import UserModel from "../../models/user.model.js";
import BlogModel from "../../models/blog.model.js";
import NewsModel from "../../models/news.model.js";
import PublicationModel from "../../models/publication.model.js";
import MediaModel from "../../models/media.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// Dashboard stats
export const getDashboardStats = asyncHandler(async (req, res) => {
  try {
    const [
      users,
      blogs,
      news,
      publications,
      media,
    ] = await Promise.all([
      UserModel.countDocuments(),
      BlogModel.countDocuments(),
      NewsModel.countDocuments(),
      PublicationModel.countDocuments(),
      MediaModel.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: {
        users,
        blogs,
        news,
        publications,
        media,
      },
    });
  } catch (error) {
    throw new ApiError(500, error.message || "Something went wrong");
  }
});
