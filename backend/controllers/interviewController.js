const CareerGoal = require("../models/CareerGoal");
const questionBanks = require("../utils/questionBanks");

const getInterviewQuestions = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch user's career goal
        const goal = await CareerGoal.findOne({ user: userId }).sort({ createdAt: -1 });

        if (!goal || !goal.targetRole) {
            return res.status(200).json(null);
        }

        const role = goal.targetRole;
        let questionsPool = [];

        // Try to find a match
        const matchedKey = Object.keys(questionBanks).find(key => 
            role.toLowerCase().includes(key.toLowerCase().replace(" developer", "")) ||
            role.toLowerCase().includes(key.toLowerCase().replace(" engineer", ""))
        );
        
        questionsPool = matchedKey ? questionBanks[matchedKey] : questionBanks["Default"];

        // Randomly return exactly 10 questions
        const shuffled = [...questionsPool].sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffled.slice(0, 10);

        res.status(200).json({
            message: "Interview questions generated successfully",
            targetRole: role,
            questions: selectedQuestions
        });

    } catch (error) {
        console.error("Interview Question Generator Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    getInterviewQuestions
};
