import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import creationRoutes from "./routes/creationRoutes.js";

const app = express();
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/pixelend";

app.use(cors());
app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true })); 

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));


app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use("/api/creations", creationRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
