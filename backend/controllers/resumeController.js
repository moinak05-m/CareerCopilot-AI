const Resume = require("../models/Resume");
const fs = require("fs");
const { calculateAtsScore } = require("../utils/atsCalculator");

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

        const pdfData = await pdfParse(dataBuffer);

        const resumeText = pdfData.text;

        // ================= Skill Database =================

        const skillDatabase = [
            "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Redux", "Tailwind CSS", "Tailwind", "Bootstrap", "Material UI", "Angular", "Vue", "Vue.js", "Svelte", "jQuery", "WebGL", "Three.js",

            "Node.js", "Express.js", "Express", "NestJS", "Java", "Spring Boot", "Spring", "Python", "Django", "Flask", "FastAPI", "PHP", "Laravel", "Symfony", "C#", "ASP.NET", ".NET", "Ruby", "Ruby on Rails", "Go", "Golang", "Rust", "C++", "C", "Perl", "Scala", "Elixir", "Erlang",

            "MongoDB", "MySQL", "PostgreSQL", "SQLite", "Redis", "Firebase", "Cassandra", "DynamoDB", "MariaDB", "Oracle", "SQL Server", "CouchDB", "Neo4j", "Elasticsearch", "Supabase", "Prisma", "Mongoose", "Sequelize",

            "AWS", "Azure", "GCP", "Google Cloud", "Docker", "Kubernetes", "CI/CD", "Jenkins", "GitLab CI", "GitHub Actions", "Terraform", "Ansible", "Linux", "Ubuntu", "Unix", "Bash",

            "Git", "GitHub", "Postman", "Swagger", "Figma", "VS Code", "Webpack", "Vite", "Babel", "npm", "Yarn", "Jest", "Cypress",

            "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-Learn", "OpenCV", "Data Science", "Power BI", "Excel",

            "React Native", "Flutter", "Swift", "Kotlin", "Android", "iOS",

            "Blockchain", "GraphQL", "REST API", "Microservices", "JWT", "Socket.io"
        ];

        const lowerResumeText = resumeText.toLowerCase();

        const extractedSkillsSet = new Set();

        skillDatabase.forEach((skill) => {
            if (lowerResumeText.includes(skill.toLowerCase())) {
                extractedSkillsSet.add(skill);
            }
        });

        const extractedSkills = Array.from(extractedSkillsSet);

        console.log("Skills:", extractedSkills);

        // ================= Save Resume =================

        // ================= ATS Score Calculation =================
        const { score, strengths, weaknesses, suggestions } = calculateAtsScore(resumeText, extractedSkills);

        // ================= Save Resume =================
        const resume = await Resume.create({
            user: req.user._id,
            filePath: req.file.path,
            fileName: req.file.originalname,
            resumeText,
            skills: extractedSkills,
            atsScore: score,
            atsStrengths: strengths,
            atsWeaknesses: weaknesses,
            atsSuggestions: suggestions,
        });

        const fileUrl = `${req.protocol}://${req.get("host")}/${req.file.path.replace(/\\/g, "/")}`;

        res.status(201).json({
            message: "Resume uploaded successfully",
            atsScore: score,
            skills: extractedSkills,
            strengths,
            weaknesses,
            suggestions,
            resume: {
                ...resume.toObject(),
                fileUrl,
            },
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const getResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            user: req.user._id,
        }).sort({ createdAt: -1 });

        if (!resume) {
            return res.status(200).json({
                resume: null,
            });
        }

        const fileUrl = `${req.protocol}://${req.get("host")}/${resume.filePath.replace(/\\/g, "/")}`;

        res.status(200).json({
            resume: {
                ...resume.toObject(),
                fileUrl,
            },
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            user: req.user._id,
        }).sort({ createdAt: -1 });

        if (!resume) {
            return res.status(404).json({
                message: "No resume found to delete.",
            });
        }

        if (fs.existsSync(resume.filePath)) {
            fs.unlinkSync(resume.filePath);
        }

        await Resume.deleteOne({
            _id: resume._id,
        });

        res.status(200).json({
            message: "Resume deleted successfully",
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    uploadResume,
    getResume,
    deleteResume,
};