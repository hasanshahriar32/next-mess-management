import { models, model, Schema } from "mongoose";

const managerSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    validity: {
      type: Object,
      required: true,
    },
    administrationTitle: {
      type: String,
      required: true,
    },
    adminMaker: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Manager = models.manager || model("manager", managerSchema);
export default Manager;
