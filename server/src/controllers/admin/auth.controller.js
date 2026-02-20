import UserModel from "../../models/user.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../../helpers/generateToken.js";

// Signup
export const signup = asyncHandler(async (req, res) => {
  const { name, email, mobile, username, password, role } = req.body;

  if (!username || !password) {
    throw new ApiError(400, "Username and password are required");
  }

  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    throw new ApiError(400, "Username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    name,
    email,
    mobile,
    username,
    password: hashedPassword,
    role,
  });

  const token = generateToken(user?._id);

  return res.status(201).json({
    success: true,
    message: "Signup successful",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      username: user.username,
      role: user.role,
      status: user.status,
      token,
    },
  });
});

// Login
export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, "Username and password are required");
  }

  const user = await UserModel.findOne({ username });
  if (!user) {
    throw new ApiError(400, "Invalid credentials");
  }

  if (!user.status) {
    throw new ApiError(403, "Account is inactive");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(400, "Invalid credentials");
  }

  const token = generateToken(user?._id);

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      username: user.username,
      role: user.role,
      status: user.status,
      token,
    },
  });
});
