const express = require("express");
const router = express.Router();
const { analyzeAtsScore, getAtsScore } = require("../controllers/atsScoreController");
const { protect } = require("../middleware/authMiddleware");

// Generate ATS Score Analysis
router.post("/", protect, analyzeAtsScore);

// Get Latest ATS Score Analysis
router.get("/", protect, getAtsScore);

module.exports = router;
