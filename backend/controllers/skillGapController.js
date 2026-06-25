const Resume = require("../models/Resume");
const CareerGoal = require("../models/CareerGoal");

// Predefined skills dictionary (14 Roles, 20-30 skills each)
const roleSkillsDictionary = {
    "MERN Stack Developer": [
        "JavaScript", "TypeScript", "React", "Node.js", "Express.js", "MongoDB", "Git", "GitHub", "REST API", "Redux", "HTML", "CSS", "Tailwind CSS", "Bootstrap", "Mongoose", "JWT", "Postman", "Jest", "Vite", "Webpack", "Docker", "AWS", "Nginx", "Linux"
    ],
    "Frontend Developer": [
        "JavaScript", "TypeScript", "React", "HTML", "CSS", "Redux", "Tailwind CSS", "Git", "GitHub", "Webpack", "Vite", "Next.js", "Vue.js", "Angular", "SASS", "Responsive Design", "Figma", "Jest", "Cypress", "Web Accessibility", "SEO", "REST API", "GraphQL", "NPM", "Yarn"
    ],
    "Backend Developer": [
        "Node.js", "Express.js", "MongoDB", "SQL", "PostgreSQL", "MySQL", "REST API", "Docker", "Git", "GitHub", "AWS", "Python", "Java", "Redis", "GraphQL", "Microservices", "JWT", "OAuth", "Linux", "Nginx", "CI/CD", "Jest", "RabbitMQ", "Kafka", "TypeScript"
    ],
    "Java Developer": [
        "Java", "Spring Boot", "Spring", "SQL", "MySQL", "PostgreSQL", "Hibernate", "REST API", "Git", "GitHub", "Microservices", "Docker", "AWS", "Maven", "Gradle", "JUnit", "Mockito", "Kafka", "Redis", "Linux", "CI/CD", "Jenkins", "IntelliJ IDEA", "OOP"
    ],
    "Python Developer": [
        "Python", "Django", "Flask", "FastAPI", "SQL", "PostgreSQL", "MongoDB", "REST API", "Git", "GitHub", "Docker", "AWS", "Linux", "PyTest", "Celery", "Redis", "Pandas", "NumPy", "GraphQL", "CI/CD", "Bash", "OOP", "Microservices"
    ],
    "Data Scientist": [
        "Python", "R", "SQL", "Pandas", "NumPy", "SciPy", "Scikit-Learn", "TensorFlow", "PyTorch", "Machine Learning", "Data Visualization", "Matplotlib", "Seaborn", "Tableau", "Power BI", "Statistics", "Mathematics", "Jupyter", "Big Data", "Spark", "Hadoop", "AWS", "Git"
    ],
    "AI Engineer": [
        "Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning", "Neural Networks", "NLP", "OpenCV", "Computer Vision", "Scikit-Learn", "Pandas", "NumPy", "SQL", "Docker", "AWS", "GCP", "Git", "GitHub", "REST API", "FastAPI", "C++", "CUDA"
    ],
    "ML Engineer": [
        "Python", "Machine Learning", "Scikit-Learn", "TensorFlow", "PyTorch", "Pandas", "NumPy", "SQL", "Docker", "Kubernetes", "AWS", "GCP", "MLflow", "CI/CD", "Git", "GitHub", "REST API", "FastAPI", "Data Engineering", "Spark", "Linux", "Bash"
    ],
    "DevOps Engineer": [
        "Linux", "Bash", "Shell Scripting", "Git", "GitHub", "GitLab CI", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Terraform", "Ansible", "Jenkins", "CI/CD", "Python", "Go", "Nginx", "Prometheus", "Grafana", "ELK Stack", "Networking", "Security", "SQL"
    ],
    "Android Developer": [
        "Kotlin", "Java", "Android Studio", "Android SDK", "XML", "Jetpack Compose", "Coroutines", "Retrofit", "Room", "SQLite", "REST API", "Git", "GitHub", "Firebase", "Material Design", "MVVM", "Dagger", "Hilt", "Unit Testing", "Espresso", "CI/CD", "Play Store"
    ],
    "Flutter Developer": [
        "Flutter", "Dart", "Widget Tree", "State Management", "Provider", "Riverpod", "BLoC", "REST API", "Git", "GitHub", "Firebase", "SQLite", "Android", "iOS", "UI/UX", "Animations", "CI/CD", "Figma", "App Store", "Play Store", "Unit Testing"
    ],
    "Cyber Security": [
        "Linux", "Networking", "TCP/IP", "Firewalls", "VPN", "Kali Linux", "Wireshark", "Nmap", "Metasploit", "Penetration Testing", "Vulnerability Assessment", "Cryptography", "Python", "Bash", "Security+", "CEH", "CISSP", "SIEM", "Incident Response", "OWASP", "Web Security"
    ],
    "Cloud Engineer": [
        "AWS", "Azure", "GCP", "Linux", "Bash", "Python", "Docker", "Kubernetes", "Terraform", "Ansible", "CI/CD", "Networking", "Security", "IAM", "CloudFormation", "Git", "GitHub", "Serverless", "Lambda", "SQL", "NoSQL", "Monitoring", "Prometheus"
    ],
    "Software Engineer": [
        "Python", "Java", "JavaScript", "C++", "C#", "Data Structures", "Algorithms", "OOP", "System Design", "SQL", "NoSQL", "REST API", "Git", "GitHub", "Docker", "Linux", "Agile", "Scrum", "CI/CD", "Testing", "AWS", "Microservices", "Design Patterns"
    ],
    "Default": [
        "JavaScript", "Git", "GitHub", "REST API", "SQL", "HTML", "CSS", "Python", "Java", "Agile", "Communication", "Problem Solving", "Linux", "Docker", "CI/CD", "AWS", "Data Structures", "Algorithms", "Testing", "OOP"
    ]
};

// Generate Skill Gap Analysis
const analyzeSkillGap = async (req, res) => {
    try {
        const userId = req.user._id;

        const resume = await Resume.findOne({ user: userId }).sort({ createdAt: -1 });

        if (!resume) {
            return res.status(200).json(null);
        }

        const goal = await CareerGoal.findOne({ user: userId }).sort({ createdAt: -1 });

        if (!goal) {
            return res.status(200).json(null);
        }

        const targetRole = goal.targetRole;
        const currentSkills = resume.skills || [];

        // Match the role or fall back to Default
        const matchedKey = Object.keys(roleSkillsDictionary).find(key => 
            targetRole.toLowerCase().includes(key.toLowerCase())
        );

        let requiredSkills = matchedKey ? roleSkillsDictionary[matchedKey] : roleSkillsDictionary["Default"];

        const currentSkillsLower = currentSkills.map((skill) => skill.toLowerCase());

        const missingSkills = requiredSkills.filter(
            (skill) => !currentSkillsLower.includes(skill.toLowerCase())
        );

        const matchedSkillsList = requiredSkills.filter(
            (skill) => currentSkillsLower.includes(skill.toLowerCase())
        );

        const matchedSkillsCount = matchedSkillsList.length;

        const score = Math.round((matchedSkillsCount / requiredSkills.length) * 100);

        // Generate dynamic recommendations based on score and missing skills
        const recommendations = [];
        if (score >= 80) {
            recommendations.push(`Excellent match for ${targetRole}! You have most of the required skills.`);
            if (missingSkills.length > 0) {
                recommendations.push(`To reach 100%, quickly brush up on: ${missingSkills.slice(0, 3).join(", ")}.`);
            }
        } else if (score >= 50) {
            recommendations.push(`You have a solid foundation for ${targetRole}, but need to learn some key technologies.`);
            recommendations.push(`Focus your learning on: ${missingSkills.slice(0, 5).join(", ")}.`);
        } else {
            recommendations.push(`You are missing several core skills for ${targetRole}.`);
            recommendations.push(`Start with the basics: ${missingSkills.slice(0, 3).join(", ")}.`);
            recommendations.push("Consider building small projects to gain practical experience.");
        }

        res.status(200).json({
            message: "Skill Gap Analysis Complete",
            targetRole,
            currentSkills,
            missingSkills,
            matchedSkills: matchedSkillsList,
            score,
            recommendations
        });
    } catch (error) {
        console.error("Skill Gap Analysis Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// GET endpoint
const getSkillGap = async (req, res) => {
    // Re-run the analysis and return it
    await analyzeSkillGap(req, res);
};

module.exports = {
    analyzeSkillGap,
    getSkillGap,
};