import mongoose from "mongoose";

const metaSchema = new mongoose.Schema({
  pageName: {
    type: String,
    trim: true,
    enum: [
      "home",
      "blog",
      "blog-detail",
      "publication",
      "publication-detail",
      "media",
      "media-detail",
      "news",
      "news-detail",
      "event",
      "event-detail",
      "about-us",
      "contact-us",
      "our-team",
      "our-growth-framework",
      "career",
      "news-and-blog",
      "service",
      "research-academic-and-innovation-partnerships",
      "in-country-representation-and-market-growth",
      "events-outreach-and-engagement",
      "operational-and-compliance-support",
    ],
    index: true,
  },
  metaTitle: {
    type: String,
    trim: true,
  },
  slug: {
    type: String,
    trim: true,
    default: null,
    index: true,
  },
  metaDescription: {
    type: String,
    trim: true,
  },
  metaKeywords: {
    type: String,
    trim: true,
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
