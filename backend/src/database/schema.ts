import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => uuidv4(),
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: 255,
  },
  lastName: {
    type: String,
    required: [true, "Please provide a lastname"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  userPreferences: {
    type: Object,
    default: {
      enable2FA: false,
      emailNotification: false,
      twoFactorSecret: null,
    },
  },
  role: {
    type: String,
    default: "USER",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const User = mongoose.model("users", userSchema)

