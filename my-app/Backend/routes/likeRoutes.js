// Like Routes
import express from "express";
import Like from "../models/Like.js";
import { verifyToken } from "./auth.js";

const likeRouter = express.Router();

likeRouter.post("/", verifyToken, async (req, res) => {
  const { imageId } = req.body;
  const userId = req.userId;

  console.log("Toggle like request:", { userId, imageId });

  try {
    const { imageId } = req.body;
    const userId = req.userId;

    console.log("Toggle like request:", { userId, imageId });

    // Check if the like already exists
    const existingLike = await Like.findOne({ imageId, userId });

    if (existingLike) {
      // Remove the like
      await Like.deleteOne({ _id: existingLike._id });
      console.log("Like removed");
      return res.status(200).json({ liked: false });
    } else {
      // Add a new like
      const newLike = await Like.create({ imageId, userId });
      console.log("New like added:", newLike);
      return res.status(200).json({ liked: true });
    }
  } catch (err) {
    console.error("Error toggling like:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

likeRouter.get("/:imageId", verifyToken, async (req, res) => {
  try {
    const { imageId } = req.params;
    const userId = req.userId;

    console.log("Fetching like status for user:", { userId, imageId });

    const existingLike = await Like.findOne({ imageId, userId });
    res.status(200).json({ liked: !!existingLike });
  } catch (err) {
    console.error("Error fetching like status:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default likeRouter;