const Resume = require("../models/Resume");
const CareerGoal = require("../models/CareerGoal");
const Roadmap = require("../models/Roadmap");

// Generate Roadmap
const generateRoadmap = async (req, res) => {
    try {

        const resume = await Resume.findOne({
            user: req.user._id,
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found",
            });
        }

        const goal = await CareerGoal.findOne({
            user: req.user._id,
        });

        if (!goal) {
            return res.status(404).json({
                message: "Career Goal not found",
            });
        }

        const currentSkills = resume.skills || [];

        const requiredSkills = [
            "JavaScript",
            "React",
            "Node.js",
            "Express.js",
            "MongoDB",
            "Git",
            "REST API",
        ];

        const missingSkills = requiredSkills.filter(
            skill => !currentSkills.includes(skill)
        );

        const roadmap = await Roadmap.create({
            user: req.user._id,
            targetRole: goal.targetRole,
            currentSkills,
            missingSkills,
        });

        res.status(201).json({
            message: "Roadmap Generated",
            roadmap,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// Get Saved Roadmap
const getRoadmap = async (req, res) => {
    try {

        const roadmap = await Roadmap.findOne({
            user: req.user._id,
        });

        if (!roadmap) {
            return res.status(404).json({
                message: "Roadmap not found",
            });
        }

        res.status(200).json(roadmap);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    generateRoadmap,
    getRoadmap,
};