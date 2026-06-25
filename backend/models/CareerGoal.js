const mongoose = require("mongoose");

const careerGoalSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    targetRole: {
        type: String,
        required: true,
    },
    timeline: {
        type: String,
        required: false,
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model(
    "CareerGoal",
    careerGoalSchema
);