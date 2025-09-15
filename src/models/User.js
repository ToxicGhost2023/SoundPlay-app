import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true, trim: true },
    userName: { type: String, unique: true, required: true, trim: true },
    verifiedMobile: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export const UserModel = models.User || model("User", UserSchema);
