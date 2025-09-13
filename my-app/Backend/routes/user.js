// auth.js - Separate file for authentication and user-related routes

import express from "express";
import dotenv from "dotenv";
import User from "../models/User.js";
import Creation from "../models/Creation.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import mongoose from 'mongoose';  // Add this import

dotenv.config(); // Ensure dotenv is configured to load environment variables

const router = express.Router();

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

// Fetch user dashboard data
// GET /api/user/dashboard
router.get("/user/dashboard", verifyToken, async (req, res) => {
  try {
    const userId = req.userId; // Extract user ID from the verified token
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Use the `boughtCreationsCount` field directly
    const boughtCreationsCount = user.boughtCreationsCount || 0;
    const wishlistCount = user.wishlistCount || 0; // Assuming wishlistCount is in the User schema
    const likeCount = user.likeCount || 0;       // Assuming likeCount is in the User schema
    const uploadCount = user.uploadCount || 0;  

    console.log("Dashboard Data:", {
      boughtCreationsCount,
      wishlistCount,
      likeCount,
      uploadCount,
    });    
    // Return the data in the response
    return res.status(200).json({ 
      boughtCreationsCount, 
      wishlistCount, 
      likeCount,
      uploadCount
    });
  } catch (error) {
    console.error("Error fetching user dashboard data:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Route to buy a creation
router.post("/user/buy", verifyToken, async (req, res) => {  // Add `verifyToken` here
  try {
    // Now, `req.userId` will be available as it is set by `verifyToken`
    const user = await User.findById(req.userId);  // Use `req.userId` as set by the `verifyToken` middleware

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Increment the bought creations count
    user.boughtCreationsCount += 1;

    // Save the user object after updating the count
    await user.save();

    // Respond with a success message
    res.status(200).json({ message: "Purchase successful!", boughtCreationsCount: user.boughtCreationsCount });
  } catch (error) {
    console.error("Error processing purchase:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});


router.post("/user/wishlist", verifyToken, async (req, res) => {
  try {
    // Now, `req.userId` will be available as it is set by `verifyToken`
    const user = await User.findById(req.userId);  // Use `req.userId` as set by the `verifyToken` middleware

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.wishlistCount += 1;

    // Save the user object after updating the count
    await user.save();

    // Respond with a success message
    res.status(200).json({ message: "Purchase successful!", boughtCreationsCount: user.boughtCreationsCount });
  } catch (error) {
    console.error("Error processing purchase:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.post("/user/like", verifyToken, async (req, res) => {
  try {
    // Fetch the user based on the authenticated userId
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Increment the user's likeCount
    user.likeCount += 1;
    await user.save();

    // Send a success response
    res.status(200).json({ message: "Like count updated successfully.", likeCount: user.likeCount });
  } catch (error) {
    console.error("Error updating like count:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.post("/user/upload", verifyToken, async (req, res) => {
  try {
    // Now, `req.userId` will be available as it is set by `verifyToken`
    const user = await User.findById(req.userId);  // Use `req.userId` as set by the `verifyToken` middleware

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.uploadCount += 1;

    // Save the user object after updating the count
    await user.save();

    // Respond with a success message
    res.status(200).json({ message: "Image uploaded successfully!", uploadCount: user.uploadCount });
  } catch (error) {
    console.error("Error processing purchase:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
