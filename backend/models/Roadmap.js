const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        targetRole : {
            type: String,
            required: true,
        },

        currentSkills:[
            {
                type:String,
            },
        ],

        missingSkills: [
            {
                type:String,
            },
        ],
        roadmapItems: [
            {
                title: String,
                description: String,
                estimatedWeeks: Number,
                freeResources: [String],
                completed: { type: Boolean, default: false },
                month: String
            }
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Roadmap",roadmapSchema);