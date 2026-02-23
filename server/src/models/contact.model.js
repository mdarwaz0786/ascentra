import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
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
  subject: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const ContactModel = mongoose.model("Contact", contactSchema);

export default ContactModel;
