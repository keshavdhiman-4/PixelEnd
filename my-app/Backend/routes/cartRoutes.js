// Cart Routes
import express from "express";
import Cart from "../models/Cart.js";
import { verifyToken } from "./auth.js";

const cartRouter = express.Router();

cartRouter.post("/", verifyToken, async (req, res) => {
  const { imageId } = req.body;
  const userId = req.userId;

  try {
    const exists = await Cart.findOne({ userId, imageId });
    if (exists) {
      return res.status(400).json({ message: "Already in cart" });
    }
    const newCartItem = await Cart.create({ userId, imageId });
    res.status(201).json(newCartItem);
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

cartRouter.get("/:imageId", verifyToken, async (req, res) => {
  const { imageId } = req.params;
  const userId = req.userId;

  try {
    const added = !!(await Cart.findOne({ userId, imageId }));
    res.json({ added });
  } catch (err) {
    console.error("Error checking cart status:", err);
    res.status(500).json({ error: "Failed to check cart status" });
  }
});

export default cartRouter;
