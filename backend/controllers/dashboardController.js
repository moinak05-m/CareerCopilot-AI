const Resume = require("../models/Resume");
const CareerGoal = require("../models/CareerGoal");
const Roadmap = require("../models/Roadmap");
const roleSkillsDictionary = require("../utils/skillsDictionary");

// For interview questions preview
const questionBanks = {
    "MERN Stack Developer": [
        { question: "Explain the concept of Virtual DOM in React.", difficulty: "Medium" },
        { question: "How do you manage state in a React application?", difficulty: "Medium" },
        { question: "What is the difference between SQL and NoSQL databases?", difficulty: "Easy" },
        { question: "Explain middleware in Express.js.", difficulty: "Medium" },
        { question: "How does Node.js handle asynchronous operations?", difficulty: "Hard" }
    ],
    // The full list is in interviewController.js. To keep it DRY, we should ideally share it.
    // However, since we just need "latestInterviewQuestions", we can just return a preview
    // or we can just require the actual interview generator logic.
    // Let's keep it simple and just return a static preview if we can't import easily.
    // Actually, I can just dynamically get 3 questions from the 'Default' if they have no role,
    // or from their role if they do. Let's just create a shared interview questions module later, 
    // or just fetch from the dictionary here for now.
    // To avoid duplication, I will implement a basic preview here and fully flesh out interview module next.
};

const getDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;

        const resume = await Resume.findOne({ user: userId }).sort({ createdAt: -1 });
        const goal = await CareerGoal.findOne({ user: userId }).sort({ createdAt: -1 });
        const roadmap = await Roadmap.findOne({ user: userId }).sort({ createdAt: -1 });

        const resumeUploaded = !!resume;
        let atsScore = resume ? resume.atsScore : 0;
        let careerGoal = goal ? { title: goal.targetRole, role: goal.targetRole, timeline: goal.timeline } : null;
        
        let skillGapScore = 0;
        let missingSkillsCount = 0;
        
        if (resume && goal) {
            const targetRole = goal.targetRole;
            const currentSkills = resume.skills || [];
            
            const matchedKey = Object.keys(roleSkillsDictionary).find(key => 
                targetRole.toLowerCase().includes(key.toLowerCase())
            );
            const requiredSkills = matchedKey ? roleSkillsDictionary[matchedKey] : roleSkillsDictionary["Default"];
            
            const currentSkillsLower = currentSkills.map(s => s.toLowerCase());
            const missingSkills = requiredSkills.filter(s => !currentSkillsLower.includes(s.toLowerCase()));
            
            missingSkillsCount = missingSkills.length;
            const matchedSkillsCount = requiredSkills.length - missingSkills.length;
            skillGapScore = Math.round((matchedSkillsCount / requiredSkills.length) * 100);
        }

        let roadmapData = null;
        if (roadmap) {
            roadmapData = {
                progress: 0,
                total: roadmap.roadmapItems ? roadmap.roadmapItems.length : 0,
                completed: 0
            };
        }

        res.status(200).json({
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email
            },
            careerGoal,
            atsScore,
            skillGapPercent: skillGapScore,
            roadmap: roadmapData,
            resume: resumeUploaded ? { uploaded: true, fileName: resume.fileName } : null,
            resumeUploaded,
            missingSkillsCount,
            latestQuestions: [
                "Tell me about a challenging project you worked on and how you overcame the obstacles.",
                "Where do you see yourself in 5 years?",
                "What are your greatest strengths and weaknesses?"
            ]
        });

    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    getDashboardData
};
