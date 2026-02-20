import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
  username: {
    type: String,
    trim: true,
    required: [true, "Username is required"],
    unique: [true, "Username is not available"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required"],
  },
  avatar: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    trim: true,
    enum: ["admin", "user"],
    default: "user",
  },
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
