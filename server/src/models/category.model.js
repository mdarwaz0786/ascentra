import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Category name is required"],
    maxlength: [100, "Category name must not exceed 100 characters"],
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
  },
  image: {
    type: String,
    trim: true,
  },
  icon: {
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

const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;
