import { models, model, Schema } from "mongoose";

const pollSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    bazar: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    bazarStatus: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Poll = models.poll || model("poll", pollSchema);
export default Poll;
