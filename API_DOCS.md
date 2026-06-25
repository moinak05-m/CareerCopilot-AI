# CareerCopilot AI API Documentation

Base URL: `/api`

Authentication: All endpoints except `/auth/register` and `/auth/login` require a Bearer token in the `Authorization` header.

Header format:
`Authorization: Bearer <your_jwt_token>`

---

## 1. Authentication (`/api/auth`)

### Register User
**Method:** `POST`
**URL:** `/api/auth/register`
**Headers:** `Content-Type: application/json`
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:** `201 Created`
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI...",
  "user": {
    "_id": "60d5ec...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login User
**Method:** `POST`
**URL:** `/api/auth/login`
**Headers:** `Content-Type: application/json`
**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:** `200 OK`
```json
{
  "message": "Login Successful",
  "token": "eyJhbGciOiJIUzI...",
  "user": {
    "_id": "60d5ec...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Get Profile
**Method:** `GET`
**URL:** `/api/auth/profile`
**Headers:** `Authorization: Bearer <token>`
**Response:** `200 OK`
Returns the user document (excluding password).

---

## 2. Career Goal (`/api/career`)

### Set Career Goal
**Method:** `POST`
**URL:** `/api/career/`
**Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
**Body:**
```json
{
  "targetRole": "MERN Stack Developer"
}
```
**Response:** `201 Created`
```json
{
  "message": "Career Goal Saved",
  "goal": {
    "targetRole": "MERN Stack Developer",
    "user": "60d5ec...",
    "_id": "60d5ec..."
  }
}
```

---

## 3. Resume (`/api/resume`)

### Upload Resume
**Method:** `POST`
**URL:** `/api/resume/upload`
**Headers:** `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
**Body:**
Form-data with key `resume` containing the PDF file.
**Response:** `201 Created`
```json
{
  "message": "Resume uploaded successfully",
  "skills": ["JavaScript", "React", "Node.js"],
  "resume": {
    "_id": "60d5ec...",
    "filePath": "uploads/12345.pdf",
    "skills": ["JavaScript", "React", "Node.js"]
  }
}
```

---

## 4. ATS Score (`/api/ats-score`)

### Analyze ATS Score
**Method:** `POST`
**URL:** `/api/ats-score/analyze`
**Headers:** `Authorization: Bearer <token>`
**Response:** `200 OK`
```json
{
  "message": "ATS Score Analyzed successfully",
  "atsScore": 85,
  "strengths": ["Professional email address found."],
  "weaknesses": ["Missing LinkedIn profile."],
  "suggestions": ["Add a link to your LinkedIn profile to boost your online presence."]
}
```

### Get Latest ATS Score
**Method:** `GET`
**URL:** `/api/ats-score/`
**Headers:** `Authorization: Bearer <token>`
**Response:** `200 OK`
```json
{
  "atsScore": 85,
  "strengths": ["Professional email address found."],
  "weaknesses": ["Missing LinkedIn profile."],
  "suggestions": ["Add a link to your LinkedIn profile to boost your online presence."]
}
```

---

## 5. Skill Gap (`/api/skill-gap`)

### Analyze Skill Gap
**Method:** `POST`
**URL:** `/api/skill-gap/`
**Headers:** `Authorization: Bearer <token>`
**Response:** `200 OK`
```json
{
  "message": "Skill Gap Analysis Complete",
  "targetRole": "MERN Stack Developer",
  "currentSkills": ["JavaScript", "React"],
  "missingSkills": ["Node.js", "Express.js", "MongoDB"],
  "matchedSkills": ["JavaScript", "React"],
  "score": 40,
  "recommendations": [
    "You have a solid foundation...",
    "Focus your learning on: Node.js, Express.js"
  ]
}
```

### Get Skill Gap (Same as POST)
**Method:** `GET`
**URL:** `/api/skill-gap/`
**Headers:** `Authorization: Bearer <token>`
**Response:** `200 OK` (Same JSON as POST)

---

## 6. Roadmap (`/api/roadmap`)

### Generate Roadmap
**Method:** `POST`
**URL:** `/api/roadmap/generate`
**Headers:** `Authorization: Bearer <token>`
**Response:** `201 Created`
```json
{
  "message": "Roadmap Generated",
  "roadmap": {
    "targetRole": "MERN Stack Developer",
    "currentSkills": ["JavaScript", "React"],
    "missingSkills": ["Node.js", "Express.js", "MongoDB"],
    "roadmapItems": [
      {
        "title": "Month 1",
        "description": "Focus on mastering: Node.js, Express.js, MongoDB",
        "estimatedWeeks": 4,
        "freeResources": ["https://www.youtube.com/..."]
      }
    ]
  }
}
```

### Get Roadmap
**Method:** `GET`
**URL:** `/api/roadmap/my-roadmap`
**Headers:** `Authorization: Bearer <token>`
**Response:** `200 OK` (Returns the saved roadmap object)

---

## 7. Interview (`/api/interview`)

### Get Interview Questions
**Method:** `GET`
**URL:** `/api/interview/`
**Headers:** `Authorization: Bearer <token>`
**Response:** `200 OK`
```json
{
  "message": "Interview questions generated successfully",
  "targetRole": "MERN Stack Developer",
  "questions": [
    {
      "question": "Explain the concept of Virtual DOM in React.",
      "difficulty": "Medium"
    }
  ]
}
```

---

## 8. Dashboard (`/api/dashboard`)

### Get Dashboard Overview
**Method:** `GET`
**URL:** `/api/dashboard/`
**Headers:** `Authorization: Bearer <token>`
**Response:** `200 OK`
```json
{
  "user": {
    "id": "60d5ec...",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "careerGoal": "MERN Stack Developer",
  "atsScore": 85,
  "skillGapScore": 40,
  "roadmapProgress": "In Progress",
  "resumeUploaded": true,
  "missingSkillsCount": 3,
  "latestInterviewQuestions": [
    "Tell me about a challenging project you worked on and how you overcame the obstacles.",
    "Where do you see yourself in 5 years?",
    "What are your greatest strengths and weaknesses?"
  ]
}
```
