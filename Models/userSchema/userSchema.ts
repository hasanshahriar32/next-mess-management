import { model, models, Schema, Model, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Use the correct type for the model
const User: Model<IUser> = models.user || model<IUser>("user", userSchema);

export default User;
