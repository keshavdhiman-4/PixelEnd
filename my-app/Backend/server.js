import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/pixelend";

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // Increase payload size limit to 10MB
app.use(express.urlencoded({ limit: "10mb", extended: true })); // For URL-encoded data

// MongoDB Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// User Schema and Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String }, // Add profilePicture field to the schema
});

const User = mongoose.model("User", userSchema);

// Routes
// Register Route
app.post("/api/auth/register", async (req, res) => {
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
app.post("/api/auth/login", async (req, res) => {
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

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Middleware to Verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from 'Bearer <token>'
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userId = decoded.id; // Attach user ID to the request object
    next();
  });
};

// Get Logged-In User Details Route
app.get("/api/user", verifyToken, async (req, res) => {
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
app.put("/api/user/profile-picture", verifyToken, async (req, res) => {
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
app.get("/api/user/profile-picture", verifyToken, async (req, res) => {
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

app.post('/api/like', async (req, res) => {
  const { imageId } = req.body;
  const userId = req.user.id; // Assume middleware sets `req.user`

  try {
    const like = await Like.findOne({ userId, imageId });
    if (like) {
      await Like.deleteOne({ userId, imageId }); // Unlike
      return res.json({ liked: false });
    } else {
      await Like.create({ userId, imageId }); // Like
      return res.json({ liked: true });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/cart', async (req, res) => {
  const { imageId } = req.body;
  const userId = req.user.id;

  try {
    const cartItem = await Cart.findOne({ userId, imageId });
    if (cartItem) {
      await Cart.deleteOne({ userId, imageId }); // Remove from cart
      return res.json({ added: false });
    } else {
      await Cart.create({ userId, imageId }); // Add to cart
      return res.json({ added: true });
    }
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post('/api/comment', async (req, res) => {
  const { imageId, comment } = req.body;
  const userId = req.user.id;

  try {
    const newComment = await Comment.create({ userId, imageId, comment });
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/download/:id", (req, res) => {
  const { id } = req.params;
  // pick .jpg / .png based on req.query.format
  const filepath = path.join(
    __dirname,
    "public",
    "assets",
    `image-${id}.jpg`
  );
  res.setHeader("Content-Type", "image/jpeg");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="image-${id}.jpg"`
  );
  res.sendFile(filepath, err => {
    if (err) {
      console.error(err);
      res.status(500).end("Error sending image");
    }
  });
});




// Server Start
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));