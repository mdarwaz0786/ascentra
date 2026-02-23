import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  mobile: {
    type: String,
    trim: true,
  },
  position: {
    type: String,
    trim: true,
  },
  coverLetter: {
    type: String,
    trim: true,
  },
  resume: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const ResumeModel = mongoose.model("Resume", resumeSchema);

export default ResumeModel;
