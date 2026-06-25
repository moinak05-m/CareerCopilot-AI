const express = require("express");
const router = express.Router();

const { uploadResume, getResume, deleteResume } = require("../controllers/resumeController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/", protect, getResume);
router.delete("/", protect, deleteResume);

router.post(
    "/upload",
    protect,
    upload.single("resume"),
    uploadResume
);

module.exports = router;