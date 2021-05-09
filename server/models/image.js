import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
  title: String,
  creatorName: String,
  creatorId: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
export default mongoose.model("Image", imageSchema);
