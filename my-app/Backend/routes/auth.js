// auth.js - Separate file for authentication and user-related routes

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import { verifyToken } from "../middleware/authMiddleware.js";

dotenv.config(); // Ensure dotenv is configured to load environment variables

const router = express.Router();

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

// Register Route
router.post("/auth/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user", error });
    }
});

// Login Route
router.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Error logging in", error });
    }
});

// Get Logged-In User Details Route
router.get("/user", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId, "name email"); // Fetch name and email
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ username: user.name, email: user.email });
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "Error fetching user details", error });
    }
});

// Update Profile Picture Route
router.put("/user/profile-picture", verifyToken, async (req, res) => {
    const { profilePicture } = req.body;

    if (!profilePicture) {
        return res.status(400).json({ message: "Profile picture is required." });
    }

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        user.profilePicture = profilePicture; // Update the profile picture
        await user.save();

        res.status(200).json({ message: "Profile picture updated successfully." });
    } catch (error) {
        console.error("Error updating profile picture:", error);
        res.status(500).json({ message: "Error updating profile picture", error });
    }
});

// Fetch Profile Picture Route
router.get("/user/profile-picture", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId, "profilePicture");
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ profilePicture: user.profilePicture });
    } catch (error) {
        console.error("Error fetching profile picture:", error);
        res.status(500).json({ message: "Error fetching profile picture", error });
    }
});

export default router;
