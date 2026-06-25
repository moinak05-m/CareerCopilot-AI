const calculateAtsScore = (resumeText, extractedSkills = []) => {
    let score = 0;
    const strengths = [];
    const weaknesses = [];
    const suggestions = [];

    const text = (resumeText || "").toLowerCase();

    // 1. Email check
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    if (emailRegex.test(resumeText)) {
        score += 20;
        strengths.push("Professional contact information included.");
    } else {
        weaknesses.push("Missing email address.");
        suggestions.push("Add a professional email address.");
    }

    // 2. Skills section
    if (text.includes("skills")) {
        score += 20;
        strengths.push("Dedicated skills section detected.");
    } else {
        weaknesses.push("No distinct skills section found.");
        suggestions.push("Add a dedicated 'Skills' section for better parsing.");
    }

    // 3. Education section
    if (text.includes("education")) {
        score += 20;
        strengths.push("Education background included.");
    } else {
        weaknesses.push("Missing education details.");
        suggestions.push("Add an 'Education' section.");
    }

    // 4. Projects section
    if (text.includes("project")) {
        score += 20;
        strengths.push("Project experience highlighted.");
    } else {
        weaknesses.push("No projects section found.");
        suggestions.push("Include a 'Projects' section to showcase practical experience.");
    }

    // 5. Technical keywords
    if (extractedSkills && extractedSkills.length > 0) {
        score += 20;
        strengths.push("Technical keywords and industry terms identified.");
    } else {
        weaknesses.push("Low technical keyword match.");
        suggestions.push("Add more technical skills and industry keywords relevant to your role.");
    }

    return {
        score: Math.min(score, 100),
        strengths,
        weaknesses,
        suggestions
    };
};

module.exports = { calculateAtsScore };
