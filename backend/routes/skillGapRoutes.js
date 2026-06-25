const express = require("express");
const router = express.Router();
const { analyzeSkillGap, getSkillGap } = require("../controllers/skillGapController");
const { protect } = require("../middleware/authMiddleware");

// Generate Skill Gap Analysis
router.post("/", protect, analyzeSkillGap);

// Get Latest Skill Gap Analysis
router.get("/", protect, getSkillGap);

module.exports = router;
