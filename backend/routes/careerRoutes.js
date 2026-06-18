const express = require("express");

const router = express.Router();

const {
    setCareerGoal,
} = require("../controllers/careerController");

const {
    protect,
} = require("../middleware/authMiddleware");

router.post(
    "/goal",
    protect,
    setCareerGoal
);

module.exports = router;