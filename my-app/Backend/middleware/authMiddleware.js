// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const header = req.headers.authorization?.replace("Bearer ", "");
  if (!header) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(header, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please log in again." });
    }    
    console.error("Token verification failed:", err);
    res.status(401).json({ message: "Invalid token" });
  }
}
