import { models, model, Schema } from "mongoose";

const bazarSchema = new Schema(
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

const Bazar = models.bazar || model("bazar", bazarSchema);
export default Bazar;
