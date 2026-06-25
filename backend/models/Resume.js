const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    filePath: {
        type: String,
        required: true,
    },

    fileName: {
        type: String,
        required: true,
    },
    resumeText : {
        type: String,
    },
    skills: [
    {
        type: String,
    },
    ],
    atsScore: {
        type: Number,
        default: 0,
    },
    atsStrengths: [
    {
        type: String,
    },
    ],
    atsWeaknesses: [
    {
        type: String,
    },
    ],
    atsSuggestions: [
    {
        type: String,
    },
    ],
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Resume", resumeSchema);