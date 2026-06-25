require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");
const careerRoutes = require("./routes/careerRoutes");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const skillGapRoutes = require("./routes/skillGapRoutes");
const atsScoreRoutes = require("./routes/atsScoreRoutes");
const interviewRoutes = require("./routes/interviewRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database Connection
connectDB();

// Home Route
app.get("/", (req, res) => {
    res.send("CareerCopilot API Running");
});

// Auth Routes
app.use("/api/auth", authRoutes);

// Resume Routes
app.use("/api/resume", resumeRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

//CareerGoal Route
app.use("/api/career",careerRoutes);

//Roadmap routes
app.use("/api/roadmap",roadmapRoutes);

// Skill Gap routes
app.use("/api/skill-gap", skillGapRoutes);

// ATS Score routes
app.use("/api/ats-score", atsScoreRoutes);

// Interview routes
app.use("/api/interview", interviewRoutes);

// Dashboard route
const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});