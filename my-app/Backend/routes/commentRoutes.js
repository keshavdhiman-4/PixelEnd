// Comment Routes
import express from "express";
import Comment from "../models/Comment.js";
import { verifyToken } from "./auth.js";

const commentRouter = express.Router();

commentRouter.post("/", verifyToken, async (req, res) => {
  const { imageId, comment } = req.body;
  const userId = req.userId;

  try {
    const newComment = await Comment.create({ userId, imageId, comment });
    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ error: "Failed to add comment" });
  }
});

commentRouter.get("/:imageId", verifyToken, async (req, res) => {
  const { imageId } = req.params;

  try {
    const comments = await Comment.find({ imageId }).sort({ timestamp: -1 });
    res.json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

export default commentRouter;