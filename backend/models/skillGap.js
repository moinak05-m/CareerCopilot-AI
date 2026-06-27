const mongoose = require("mongoose");

const skillGapSchema = new mongoose.Schema(
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

        currentSkills: [String],

        missingSkills: [String],

        score: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("SkillGap", skillGapSchema);