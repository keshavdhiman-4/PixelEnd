const Like = require("../models/Like");
const Comment = require("../models/Comment");
const Cart = require("../models/Cart");

exports.saveLike = async (req, res) => {
  const { userId, imageId, liked } = req.body;
  try {
    await Like.updateOne({ userId, imageId }, { liked }, { upsert: true });
    res.status(200).json({ message: "Like updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error updating like" });
  }
};

exports.saveComment = async (req, res) => {
  const { userId, imageId, comment } = req.body;
  try {
    const newComment = await Comment.create({ userId, imageId, comment });
    res.status(200).json({ comment: newComment });
  } catch (err) {
    res.status(500).json({ error: "Error saving comment" });
  }
};

exports.saveCart = async (req, res) => {
  const { userId, imageId, added } = req.body;
  try {
    await Cart.updateOne({ userId, imageId }, { added }, { upsert: true });
    res.status(200).json({ message: "Cart updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error updating cart" });
  }
};
