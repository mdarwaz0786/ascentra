import ResumeModel from "../../models/resume.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";
import fs from "fs";
import path from "path";
import uploadFile from "../../helpers/uploadFile.js";

// ================= CREATE RESUME =================
export const createResume = asyncHandler(async (req, res) => {
  const { name, email, mobile, position, coverLetter } = req.body;

  let resumePath = null;

  try {

    if (req.files?.resume?.[0]) {
      const file = req.files.resume[0];

      resumePath = await uploadFile({
        buffer: file.buffer,
        originalname: file.originalname,
        mimetype: file.mimetype,
        folder: "resume",
        maxSizeMB: 1,
      });
    }

    const resume = await ResumeModel.create({
      name,
      email,
      mobile,
      position,
      coverLetter,
      resume: resumePath,
    });

    return res.status(201).json({
      success: true,
      message: "Resume submitted successfully",
      data: resume,
    });
  } catch (error) {
    if (resumePath && fs.existsSync(path.join(process.cwd(), resumePath))) {
      fs.unlinkSync(path.join(process.cwd(), resumePath));
    }
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

// ================= GET ALL RESUMES =================
export const getResumes = asyncHandler(async (req, res) => {
  let {
    search,
    status,
    sort = "desc",
    page = 1,
    limit = 10,
  } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;

  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { mobile: { $regex: search, $options: "i" } },
    ];
  }

  if (status !== undefined) {
    filters.status = status === "true";
  }

  const sortOption = {
    createdAt: sort === "asc" ? 1 : -1,
  };

  const [resumes, total] = await Promise.all([
    ResumeModel.find(filters)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),
    ResumeModel.countDocuments(filters),
  ]);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: resumes,
    pagination: buildPagination({ page, limit, total }),
  });
});

// ================= GET RESUME BY ID =================
export const getResumeById = asyncHandler(async (req, res) => {
  const resume = await ResumeModel.findById(req.params.id);

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: resume,
  });
});

// ================= UPDATE RESUME =================
export const updateResume = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const resume = await ResumeModel.findById(req.params.id);
  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  if (status !== undefined) resume.status = status === "true" || status === true;

  await resume.save();

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: resume,
  });
});

// ================= DELETE RESUME =================
export const deleteResume = asyncHandler(async (req, res) => {
  const resume = await ResumeModel.findById(req.params.id);

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  if (resume.resume && fs.existsSync(path.join(process.cwd(), resume.resume))) {
    fs.unlinkSync(path.join(process.cwd(), resume.resume));
  }

  await resume.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
