const Resume = require("../models/Resume");
const { calculateAtsScore } = require("../utils/atsCalculator");

const analyzeAtsScore = async (req, res) => {
    try {
        const userId = req.user._id;

        const resume = await Resume.findOne({
            user: userId,
        }).sort({ createdAt: -1 });

        console.log("====== FULL RESUME ======");
        console.log(resume);
        console.log("=========================");

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found. Please upload a resume first.",
            });
        }

        const resumeText = resume.resumeText || "";

        console.log("====== ATS RESUME TEXT ======");
        console.log(resumeText);
        console.log("============================");

        const { score, strengths, weaknesses, suggestions } = calculateAtsScore(resumeText, resume.skills);

        resume.atsScore = score;
        resume.atsStrengths = strengths;
        resume.atsWeaknesses = weaknesses;
        resume.atsSuggestions = suggestions;

        await resume.save();

        res.status(200).json({
            message: "ATS Score Generated",
            atsScore: score,
            strengths,
            weaknesses,
            suggestions,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const getAtsScore = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            user: req.user._id,
        }).sort({ createdAt: -1 });

        if (!resume) {
            return res.status(200).json({
                atsScore: null,
                suggestions: [],
            });
        }

        if ((!resume.atsScore || resume.atsScore === 0) && resume.resumeText) {
            const { score, strengths, weaknesses, suggestions } = calculateAtsScore(resume.resumeText, resume.skills);

            resume.atsScore = score;
            resume.atsStrengths = strengths;
            resume.atsWeaknesses = weaknesses;
            resume.atsSuggestions = suggestions;
            await resume.save();
        }

        res.status(200).json({
            atsScore: resume.atsScore || 0,
            strengths: resume.atsStrengths || [],
            weaknesses: resume.atsWeaknesses || [],
            suggestions: resume.atsSuggestions || [],
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    analyzeAtsScore,
    getAtsScore,
};