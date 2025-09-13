import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/pixelend";
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
 