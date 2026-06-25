const express = require("express");
const router = express.Router();
const { getInterviewQuestions } = require("../controllers/interviewController");
const { protect } = require("../middleware/authMiddleware");

// Get Interview Questions dynamically
router.get("/", protect, getInterviewQuestions);

module.exports = router;
