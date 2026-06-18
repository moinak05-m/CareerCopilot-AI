const Resume = require("../models/Resume");
const fs = require("fs");

const pdfParseModule = require("pdf-parse");
const pdfParse = pdfParseModule.default || pdfParseModule;

const uploadResume = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        console.log("File Uploaded:", req.file.originalname);

        const dataBuffer = fs.readFileSync(req.file.path);

        console.log("Reading PDF...");

        const pdfData = await pdfParse(dataBuffer);

        console.log("PDF Parsed Successfully");

        const resumeText = pdfData.text;

        console.log("========= RESUME TEXT =========");
        console.log(resumeText);
        console.log("===============================");

        // Skill Database
        const skillDatabase = [
            "JavaScript",
            "React",
            "Node.js",
            "Express.js",
            "MongoDB",
            "HTML",
            "CSS",
            "Python",
            "Java",
            "C++",
            "SQL",
            "Git",
            "GitHub",
            "AWS",
            "Docker",
        ];

        // Extract Skills
        const extractedSkills = skillDatabase.filter((skill) =>
            resumeText.toLowerCase().includes(skill.toLowerCase())
        );

        console.log("========= SKILLS FOUND =========");
        console.log(extractedSkills);
        console.log("================================");

        const resume = await Resume.create({
            user: req.user._id,
            filePath: req.file.path,
            fileName: req.file.originalname,
            resumeText,
            skills: extractedSkills,
        });

        res.status(201).json({
            message: "Resume uploaded successfully",
            skills: extractedSkills,
            resume,
        });

    } catch (error) {

        console.log("UPLOAD ERROR:");
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    uploadResume,
};