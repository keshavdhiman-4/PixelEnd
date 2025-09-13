import mongoose from "mongoose";

// Like Schema
const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  imageId: { type: String, required: true },
  // timestamp: { type: Date, default: Date.now },
});

const Like = mongoose.model("Like", likeSchema);
export default Like;