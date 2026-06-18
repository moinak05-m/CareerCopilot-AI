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
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Resume", resumeSchema);