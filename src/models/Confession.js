import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

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
    comments: [commentSchema],

  },
  { timestamps: true }
);

//If the Post collection does not exist create a new one.
export default mongoose.models.Confession || mongoose.model("Confession", confessionSchema);