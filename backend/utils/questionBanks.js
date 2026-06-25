const generateQuestionsForRole = (role) => {
    // A base set of 25 questions tailored per role.
    // To keep the file manageable, we use a mix of specific and advanced generic questions 
    // replacing the placeholder with the role name where applicable.
    
    const specificMap = {
        "MERN Stack Developer": [
            { question: "Explain the concept of Virtual DOM in React.", difficulty: "Easy" },
            { question: "How do you manage state in a React application?", difficulty: "Medium" },
            { question: "What is the difference between SQL and NoSQL databases?", difficulty: "Easy" },
            { question: "Explain middleware in Express.js.", difficulty: "Medium" },
            { question: "How does Node.js handle asynchronous operations?", difficulty: "Hard" },
            { question: "What are React Hooks and why were they introduced?", difficulty: "Medium" },
            { question: "How does MongoDB store data compared to a relational database?", difficulty: "Easy" },
            { question: "Explain the purpose of Redux Thunk or Saga.", difficulty: "Hard" }
        ],
        "Frontend Developer": [
            { question: "What is CSS Flexbox and how does it differ from CSS Grid?", difficulty: "Easy" },
            { question: "Explain event delegation in JavaScript.", difficulty: "Medium" },
            { question: "How do you optimize a website's performance?", difficulty: "Medium" },
            { question: "What are React Hooks? Provide examples.", difficulty: "Medium" },
            { question: "Explain Cross-Site Scripting (XSS) and how to prevent it.", difficulty: "Hard" },
            { question: "What is the difference between let, const, and var?", difficulty: "Easy" },
            { question: "How does the browser rendering engine work?", difficulty: "Hard" }
        ],
        "Backend Developer": [
            { question: "What is REST architecture?", difficulty: "Easy" },
            { question: "Explain how JSON Web Tokens (JWT) work.", difficulty: "Medium" },
            { question: "How do you prevent SQL Injection?", difficulty: "Medium" },
            { question: "What is the purpose of indexing in a database?", difficulty: "Medium" },
            { question: "Explain horizontal vs vertical scaling.", difficulty: "Hard" },
            { question: "What are microservices and what are their pros/cons?", difficulty: "Hard" }
        ],
        "Java Developer": [
            { question: "What is the difference between an Interface and an Abstract Class?", difficulty: "Easy" },
            { question: "Explain the concept of OOPs.", difficulty: "Easy" },
            { question: "How does Garbage Collection work in Java?", difficulty: "Medium" },
            { question: "What are the differences between ArrayList and LinkedList?", difficulty: "Medium" },
            { question: "Explain the Spring Boot architecture.", difficulty: "Hard" },
            { question: "What is the Volatile keyword in Java?", difficulty: "Hard" }
        ],
        "Python Developer": [
            { question: "What are decorators in Python?", difficulty: "Medium" },
            { question: "Explain the difference between list and tuple.", difficulty: "Easy" },
            { question: "How does memory management work in Python?", difficulty: "Hard" },
            { question: "What is a lambda function?", difficulty: "Easy" },
            { question: "Explain the Global Interpreter Lock (GIL).", difficulty: "Hard" }
        ]
    };

    const specific = specificMap[role] || [];
    
    const generics = [
        { question: `What are the most important design patterns for a ${role}?`, difficulty: "Medium" },
        { question: `How would you optimize an existing application as a ${role}?`, difficulty: "Hard" },
        { question: "Describe a time you had a conflict with a team member and how you resolved it.", difficulty: "Easy" },
        { question: "How do you handle debugging a complex issue?", difficulty: "Medium" },
        { question: "Explain the concept of continuous integration and continuous deployment (CI/CD).", difficulty: "Medium" },
        { question: "What is the difference between procedural programming and object-oriented programming?", difficulty: "Easy" },
        { question: "How do you handle user authentication and authorization?", difficulty: "Medium" },
        { question: `What recent technologies or trends in ${role} are you most excited about?`, difficulty: "Easy" },
        { question: "What is CORS and why is it important?", difficulty: "Medium" },
        { question: "Explain how you would design a scalable application from scratch.", difficulty: "Hard" },
        { question: "What are the benefits of using a version control system like Git?", difficulty: "Easy" },
        { question: `Explain a challenging technical problem you faced as a ${role} and how you solved it.`, difficulty: "Hard" },
        { question: "How do you ensure your code is secure?", difficulty: "Medium" },
        { question: "What is your approach to writing unit tests?", difficulty: "Medium" },
        { question: "Explain the SOLID principles.", difficulty: "Hard" },
        { question: "How do you manage technical debt?", difficulty: "Medium" },
        { question: `What metrics do you use to measure the success of a ${role} project?`, difficulty: "Medium" },
        { question: "Describe a situation where you had to learn a new technology quickly.", difficulty: "Easy" },
        { question: "How do you prioritize tasks when working on multiple projects?", difficulty: "Easy" },
        { question: "What is the most complex algorithm you have written?", difficulty: "Hard" },
        { question: `How do you stay updated with the latest advancements in ${role}?`, difficulty: "Easy" },
        { question: "Explain the concept of caching and when to use it.", difficulty: "Medium" },
        { question: "How do you handle failure in a distributed system?", difficulty: "Hard" },
        { question: "What is your experience with containerization (e.g., Docker)?", difficulty: "Medium" },
        { question: "How do you perform code reviews?", difficulty: "Medium" }
    ];

    // Combine and pad to ensure at least 25 questions
    let combined = [...specific];
    let i = 0;
    while (combined.length < 25 && i < generics.length) {
        combined.push(generics[i]);
        i++;
    }
    return combined;
};

const roles = [
    "MERN Stack Developer", "Frontend Developer", "Backend Developer", "Java Developer",
    "Python Developer", "Data Scientist", "AI Engineer", "ML Engineer", "DevOps Engineer",
    "Android Developer", "Flutter Developer", "Cyber Security", "Cloud Engineer", "Software Engineer", "Default"
];

const questionBanks = {};
roles.forEach(role => {
    questionBanks[role] = generateQuestionsForRole(role);
});

module.exports = questionBanks;
