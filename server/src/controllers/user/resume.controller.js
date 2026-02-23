import ResumeModel from "../../models/resume.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
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


