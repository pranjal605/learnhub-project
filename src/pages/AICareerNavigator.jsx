
import React, { useState } from 'react';
import './AICareerNavigator.css'; // We'll create this CSS file next

const AICareerNavigator = () => {
    const [selectedRole, setSelectedRole] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);

    const roles = [
        { id: 'sde', name: 'Software Development Engineer (SDE)', icon: '💻' },
        { id: 'ds', name: 'Data Scientist', icon: '📊' },
        { id: 'aiml', name: 'AI/ML Engineer', icon: '🤖' },
        { id: 'devops', name: 'DevOps Engineer', icon: '⚙️' },
    ];

    const mockRoadmaps = {
        sde: {
            roadmap: [
                'Learn a Programming Language (Java/C++/Python)',
                'Data Structures & Algorithms (Arrays, Trees, Graphs, DP)',
                'Object-Oriented Design & System Design',
                'Database Management (SQL/NoSQL)',
                'Web Development Basics (HTML/CSS/JS)',
                'Version Control (Git/GitHub)'
            ],
            missingSkills: ['System Design', 'Advanced Graph Algorithms', 'Docker Basics']
        },
        ds: {
            roadmap: [
                'Python/R Programming',
                'Statistics & Probability',
                'Data Manipulation (Pandas, NumPy)',
                'Data Visualization (Matplotlib, Seaborn)',
                'Machine Learning Basics (Scikit-learn)',
                'SQL for Data Science'
            ],
            missingSkills: ['Deep Learning Concepts', 'Big Data Tools (Spark)', 'A/B Testing']
        },
        aiml: {
            roadmap: [
                'Advanced Python',
                'Calculus & Linear Algebra',
                'Deep Learning Frameworks (TensorFlow/PyTorch)',
                'Natural Language Processing (NLP)',
                'Computer Vision',
                'Model Deployment (MLOps)'
            ],
            missingSkills: ['Transformers', 'Reinforcement Learning', 'Cloud ML Services']
        },
        devops: {
            roadmap: [
                'Linux & Shell Scripting',
                'Cloud Platforms (AWS/Azure/GCP)',
                'CI/CD Pipelines (Jenkins/GitHub Actions)',
                'Containerization (Docker/Kubernetes)',
                'Infrastructure as Code (Terraform)',
                'Monitoring & Logging (Prometheus/Grafana)'
            ],
            missingSkills: ['Kubernetes Advanced', 'Serverless Architecture', 'Network Security']
        }
    };

    const handleFileChange = (e) => {
        setResumeFile(e.target.files[0]);
    };

    const handleGenerate = () => {
        if (!selectedRole) {
            alert('Please select a target role based on your interest.');
            return;
        }
        if (!resumeFile) {
            alert('Please upload your resume to analyze your current skills.');
            return;
        }

        setLoading(true);
        // Simulate AI analysis delay
        setTimeout(() => {
            const result = mockRoadmaps[selectedRole];
            setAnalysisResult({
                role: roles.find(r => r.id === selectedRole).name,
                ...result
            });
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="career-navigator-container">
            <header className="navigator-header">
                <h1>AI Career Navigator</h1>
                <p>Upload your resume and choose your dream role to get a personalized roadmap.</p>
            </header>

            <div className="navigator-content">
                <div className="input-section">
                    <div className="card upload-card">
                        <h3>1. Upload Resume</h3>
                        <div className="file-upload-wrapper">
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                id="resume-upload"
                                className="file-input"
                            />
                            <label htmlFor="resume-upload" className="file-label">
                                {resumeFile ? resumeFile.name : 'Choose PDF/DOCX'}
                            </label>
                        </div>
                    </div>

                    <div className="card role-card">
                        <h3>2. Select Target Role</h3>
                        <div className="role-grid">
                            {roles.map((role) => (
                                <div
                                    key={role.id}
                                    className={`role-option ${selectedRole === role.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedRole(role.id)}
                                >
                                    <span className="role-icon">{role.icon}</span>
                                    <span className="role-name">{role.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="action-section">
                    <button
                        className="generate-btn"
                        onClick={handleGenerate}
                        disabled={loading}
                    >
                        {loading ? 'Analyzing & Generating...' : 'Generate Roadmap'}
                    </button>
                </div>

                {analysisResult && (
                    <div className="results-section">
                        <h2>Your Path to becoming a {analysisResult.role}</h2>

                        <div className="result-grid">
                            <div className="result-card roadmap-card">
                                <h3>🚀 Personalized Roadmap</h3>
                                <ul className="roadmap-list">
                                    {analysisResult.roadmap.map((step, index) => (
                                        <li key={index} className="roadmap-item">
                                            <span className="step-number">{index + 1}</span>
                                            <span className="step-text">{step}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="result-card gap-card">
                                <h3>🔍 Recommended Skills to Add</h3>
                                <p>Based on your resume, you should focus on adding these skills:</p>
                                <div className="skills-tags">
                                    {analysisResult.missingSkills.map((skill, index) => (
                                        <span key={index} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AICareerNavigator;
