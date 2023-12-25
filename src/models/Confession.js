import mongoose from "mongoose";

const { Schema } = mongoose;

const confessionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

//If the Post collection does not exist create a new one.
export default mongoose.models.Confession || mongoose.model("Confession", confessionSchema);