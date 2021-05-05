const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  imageURL: {
    type: String,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Image", imageSchema);
