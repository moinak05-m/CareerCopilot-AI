require("dotenv").config();

const express = require("express");
const connectDB = require("./utils/db");
const careerRoutes = require("./routes/careerRoutes");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");

const app = express();

// Middleware
app.use(express.json());

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});