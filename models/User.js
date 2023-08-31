import mongoose from "mongoose";

const socialSchema = new mongoose.Schema({
  linkedIn: {
    type: String,
  },
  twitter: {
    type: String,
  },
  instagram: {
    type: String,
  },
  facebook: {
    type: String,
  },
  github: {
    type: String,
  },
});

const personalSchema = new mongoose.Schema({
  location: {
    type: String,
    maxLength:60
  },
  company: {
    type: String,
    maxLength: 60,
  },
  bio: {
    type: String,
    maxLength: 600,
  },
});
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 60,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 100,
    },
    image: {
      type: String,
      default: "https://res.cloudinary.com/dhk9gwc4q/image/upload/v1690988668/samples/animals/three-dogs.jpg",
    },
    socials: [socialSchema],
    personalInfo:[personalSchema],
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;
