import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Title is required"],
  },
  slug: {
    type: String,
    trim: true,
    default: null,
  },
  image: {
    type: String,
    trim: true,
    required: [true, "Image is required"],
  },
  source: {
    type: String,
    trim: true,
    required: [true, "Source is required"],
  },
  link: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  time: {
    type: String,
    trim: true,
    default: null,
  },
  shortDescription: {
    type: String,
    trim: true,
    required: [true, "Short description is required"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, { timestamps: true });

const MediaModel = mongoose.model("Media", mediaSchema);

export default MediaModel;
