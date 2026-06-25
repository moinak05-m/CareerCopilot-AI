const express = require("express");

const router = express.Router();

const {
    setCareerGoal,
    getCareerGoal,
} = require("../controllers/careerController");

const {
    protect,
} = require("../middleware/authMiddleware");

router.get(
    "/goal",
    protect,
    getCareerGoal
);

router.post(
    "/goal",
    protect,
    setCareerGoal
);

module.exports = router;