const CareerGoal = require("../models/CareerGoal");

const setCareerGoal = async (req, res) => {
    try {

        const { targetRole, timeline } = req.body;

        if (!targetRole) {
            return res.status(400).json({
                message: "Target role is required to set a career goal.",
            });
        }

        const goal = await CareerGoal.create({
            user: req.user._id,
            targetRole,
            timeline,
        });

        res.status(201).json({
            message: "Career Goal Saved",
            goal,
        });

    } catch (error) {
        console.error("Career Goal Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const getCareerGoal = async (req, res) => {
    try {
        const goal = await CareerGoal.findOne({ user: req.user._id }).sort({ createdAt: -1 });
        if (!goal) {
            return res.status(200).json({ goal: null });
        }
        res.status(200).json({ goal });
    } catch (error) {
        console.error("GET Career Goal Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    setCareerGoal,
    getCareerGoal,
};