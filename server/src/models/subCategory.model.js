import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
    index: true,
  },
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
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: null,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

subCategorySchema.index({ name: 1 });
subCategorySchema.index({ category: 1 });

subCategorySchema.virtual("category", {
  ref: "Category",
  localField: "category",
  foreignField: "_id",
  justOne: true
});

subCategorySchema.virtual("subSubCategories", {
  ref: "SubSubCategory",
  localField: "_id",
  foreignField: "subCategory",
  justOne: false
});

const SubCategoryModel = mongoose.model("SubCategory", subCategorySchema);

export default SubCategoryModel;
