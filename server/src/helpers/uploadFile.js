import sharp from "sharp";
import path from "path";
import fs from "fs";
import ApiError from "./apiError.js";

const uploadFile = async ({
  buffer,
  originalname,
  mimetype,
  folder = "common",
  maxSizeMB = 5,
}) => {
  try {
    if (!buffer || !originalname || !mimetype) {
      throw new ApiError(400, "Invalid file upload");
    }

    const uploadDir = path.join(process.cwd(), "uploads", folder);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileSizeMB = buffer.length / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      throw new ApiError(422, `File size exceeds ${maxSizeMB}MB limit`);
    }

    const baseName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    if (mimetype.startsWith("image/")) {
      const finalPath = path.join(uploadDir, `${baseName}.webp`);

      await sharp(buffer)
        .resize({ width: 1200, fit: "inside" })
        .webp({ quality: 80 })
        .toFile(finalPath);

      return `uploads/${folder}/${baseName}.webp`;
    }

    const allowedDocs = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedDocs.includes(mimetype)) {
      const ext = path.extname(originalname);
      const finalPath = path.join(uploadDir, `${baseName}${ext}`);

      fs.writeFileSync(finalPath, buffer);

      return `uploads/${folder}/${baseName}${ext}`;
    }

    throw new ApiError(415, "Unsupported file type");
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(400, "File upload failed");
  }
};

export default uploadFile;
