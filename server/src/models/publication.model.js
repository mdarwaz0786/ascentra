import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Title is required"],
  },
  slug: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
    required: [true, "Image is required"],
  },
  banner: {
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
  },
  tags: {
    type: String,
    trim: true,
  },
  shortDescription: {
    type: String,
    trim: true,
    required: [true, "Short description is required"],
  },
  fullDescription: {
    type: String,
    trim: true,
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

const PublicationModel = mongoose.model("Publication", publicationSchema);

export default PublicationModel;
