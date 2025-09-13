// routes/creationRoutes.js
import express from "express";
import Creation from "../models/Creation.js";
const router = express.Router();

// GET /api/creations
router.get("/", async (req, res) => {
  try {
    const all = await Creation.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: "Error fetching creations" });
  }
});

// GET /api/creations/:id
router.get("/:id", async (req, res) => {
  try {
    const one = await Creation.findById(req.params.id);
    if (!one) return res.status(404).json({ message: "Not found" });
    res.json(one);
  } catch (err) {
    res.status(500).json({ message: "Error fetching creation" });
  }
});

export default router;
