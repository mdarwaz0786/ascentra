import mongoose from "mongoose";

const metaSchema = new mongoose.Schema({
  pageName: {
    type: String,
    trim: true,
    default: null,
  },
  metaTitle: {
    type: String,
    trim: true,
    required: [true, "Meta Title is required"],
  },
  slug: {
    type: String,
    trim: true,
    default: null,
  },
  metaDescription: {
    type: String,
    trim: true,
    required: [true, "Meta description is required"],
  },
  metaKeywords: {
    type: String,
    trim: true,
    required: [true, "Meta keywords is required"],
  },
  metaAuthor: {
    type: String,
    trim: true,
    default: null,
  },
  metaImage: {
    type: String,
    trim: true,
    default: null,
  },
  canonicalUrl: {
    type: String,
    trim: true,
    default: "https://aceascentra.com",
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

const MetaModel = mongoose.model("Meta", metaSchema);

export default MetaModel;
