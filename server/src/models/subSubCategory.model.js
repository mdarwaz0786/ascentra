import mongoose from "mongoose";

const subSubCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    unique: true,
    maxlength: [100, "Name must not exceed 100 characters"],
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
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [250, "Short description must not exceed 250 characters"],
  },
  fullDescription: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
    index: true,
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: [true, "Subcategory is required"],
    index: true,
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
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

subSubCategorySchema.index({ name: 1 });
subSubCategorySchema.index({ category: 1, subCategory: 1 });

subSubCategorySchema.virtual("category", {
  ref: "Category",
  localField: "category",
  foreignField: "_id",
  justOne: true
});

subSubCategorySchema.virtual("subCategory", {
  ref: "SubCategory",
  localField: "subCategory",
  foreignField: "_id",
  justOne: true
});

const SubSubCategoryModel = mongoose.model("SubSubCategory", subSubCategorySchema);

export default SubSubCategoryModel;
