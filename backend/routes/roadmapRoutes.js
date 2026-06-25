const express = require("express");
const router = express.Router();

const {
    generateRoadmap,
    getRoadmap,
    markCompleted,
} = require("../controllers/roadmapController");

const { protect } = require("../middleware/authMiddleware");

router.post(
    "/generate",
    protect,
    generateRoadmap
);

router.get(
    "/my-roadmap",
    protect,
    getRoadmap
);

router.patch(
    "/:id",
    protect,
    markCompleted
);

module.exports = router;