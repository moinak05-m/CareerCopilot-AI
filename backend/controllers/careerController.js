const CareerGoal = require("../models/CareerGoal");

const setCareerGoal = async (req, res) => {
    try {

        const { targetRole } = req.body;

        const goal = await CareerGoal.create({
            user: req.user._id,
            targetRole,
        });

        res.status(201).json({
            message: "Career Goal Saved",
            goal,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    setCareerGoal,
};