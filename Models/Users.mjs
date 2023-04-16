import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    // profilePicture: { type: String },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("User", UserSchema);
