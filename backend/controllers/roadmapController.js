const Resume = require("../models/Resume");
const CareerGoal = require("../models/CareerGoal");
const Roadmap = require("../models/Roadmap");
const roleSkillsDictionary = require("../utils/skillsDictionary");

const createRoadmapForUser = async (userId) => {
    const resume = await Resume.findOne({ user: userId }).sort({ createdAt: -1 });
    if (!resume) return null;
    const goal = await CareerGoal.findOne({ user: userId }).sort({ createdAt: -1 });
    if (!goal) return null;

    const targetRole = goal.targetRole;
    const currentSkills = resume.skills || [];

    // Delete existing roadmap so we always have exactly one fresh copy
    await Roadmap.deleteMany({ user: userId });

    const matchedKey = Object.keys(roleSkillsDictionary).find(key => 
        targetRole.toLowerCase().includes(key.toLowerCase())
    );
    let requiredSkills = matchedKey ? roleSkillsDictionary[matchedKey] : roleSkillsDictionary["Default"];

    const currentSkillsLower = currentSkills.map(skill => skill.toLowerCase());
    const missingSkills = requiredSkills.filter(
        skill => !currentSkillsLower.includes(skill.toLowerCase())
    );

    const timelineStr = goal.timeline || "6 months";
    let totalMonths = 6;
    if (timelineStr === "1 month") totalMonths = 1;
    else if (timelineStr === "3 months") totalMonths = 3;
    else if (timelineStr === "6 months") totalMonths = 6;
    else if (timelineStr === "1 year") totalMonths = 12;

    const roadmapItems = [];
    const numBuckets = totalMonths;
    const skillsPerBucket = Math.ceil(missingSkills.length / numBuckets) || 1;
    
    for (let i = 0; i < numBuckets; i++) {
        const start = i * skillsPerBucket;
        const chunk = missingSkills.slice(start, start + skillsPerBucket);
        
        let description = "";
        let freeResources = [];
        
        if (chunk.length > 0) {
            description = `Focus on mastering: ${chunk.join(", ")}`;
            freeResources = chunk.map(skill => `https://www.youtube.com/results?search_query=${encodeURIComponent(skill + " crash course")}`);
        } else {
            description = "Consolidate your knowledge by building complex projects and applying to jobs.";
            freeResources = ["https://github.com/practical-tutorials/project-based-learning"];
        }
        
        roadmapItems.push({
            title: `Month ${i + 1}`,
            month: `Month ${i + 1}`,
            description,
            estimatedWeeks: 4,
            freeResources
        });
    }

    return await Roadmap.create({
        user: userId,
        targetRole: targetRole,
        currentSkills,
        missingSkills,
        roadmapItems
    });
};

const generateRoadmap = async (req, res) => {
    try {
        const roadmap = await createRoadmapForUser(req.user._id);

        if (!roadmap) {
            return res.status(400).json({ message: "Resume or Career Goal missing. Cannot generate roadmap." });
        }

        res.status(201).json({
            message: "Roadmap Generated",
            roadmap: {
                goalTitle: roadmap.targetRole,
                milestones: roadmap.roadmapItems,
            }
        });

    } catch (error) {
        console.error("Roadmap Generation Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const getRoadmap = async (req, res) => {
    try {
        let roadmap = await Roadmap.findOne({ user: req.user._id }).sort({ createdAt: -1 });
        const goal = await CareerGoal.findOne({ user: req.user._id }).sort({ createdAt: -1 });

        let needsNewRoadmap = false;

        if (goal) {
            const timelineStr = goal.timeline || "6 months";
            let expectedMonths = 6;
            if (timelineStr === "1 month") expectedMonths = 1;
            else if (timelineStr === "3 months") expectedMonths = 3;
            else if (timelineStr === "6 months") expectedMonths = 6;
            else if (timelineStr === "1 year") expectedMonths = 12;

            if (!roadmap) {
                needsNewRoadmap = true;
            } else if (roadmap.targetRole !== goal.targetRole || roadmap.roadmapItems.length !== expectedMonths) {
                // Goal changed, force regeneration
                needsNewRoadmap = true;
            }
        }

        if (needsNewRoadmap) {
            roadmap = await createRoadmapForUser(req.user._id);
        }

        if (!roadmap) {
            return res.status(200).json(null);
        }

        res.status(200).json({
            goalTitle: roadmap.targetRole,
            milestones: roadmap.roadmapItems,
        });

    } catch (error) {
        console.error("Get Roadmap Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const markCompleted = async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        
        const roadmap = await Roadmap.findOne({ "roadmapItems._id": id, user: req.user._id });
        if (!roadmap) {
            return res.status(404).json({ message: "Milestone not found" });
        }

        const item = roadmap.roadmapItems.id(id);
        if (item) {
            item.completed = completed;
            await roadmap.save();
        }

        res.status(200).json({ message: "Updated" });
    } catch (error) {
        console.error("Mark Completed Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    generateRoadmap,
    getRoadmap,
    markCompleted,
};