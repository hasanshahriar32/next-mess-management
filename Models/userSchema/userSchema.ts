import { model, models, Schema, Model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    idCard: {
      type: Number,
      required: true,
    },
    messMemberStatus: {
      type: Boolean,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    parentNumber: {
      type: Number,
      required: true,
    },
    personalNumber: {
      type: Number,
      required: true,
    },
    religious: {
      type: String,
      required: true,
    },
    reportCardStatus: {
      type: Boolean,
      required: true,
    },
    selectedImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Use the correct type for the model
const User = models.user || model("user", userSchema);

export default User;
