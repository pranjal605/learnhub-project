import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { executeCode } from '../utils/jdoodle';
import './CodingPractice.css';
import {
    Play,
    Terminal,
    Info,
    ArrowLeft,
    Cpu,
    CheckCircle2,
    XCircle,
    RotateCcw
} from 'lucide-react';

const problemData = {
    'arrays': {
        title: 'Two Sum',
        difficulty: 'Easy',
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        examples: [{ input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: '2 + 7 = 9.' }],
        constraints: ['2 <= nums.length <= 104'],
        starterCode: {
            javascript: `// Write your code here\nfunction twoSum(nums, target) {\n    \n}`,
            python: 'def twoSum(nums, target):\n    # Write code here\n    pass',
            cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};',
            java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}'
        },
        testCases: [
            { params: [[2, 7, 11, 15], 9], expected: [0, 1] },
            { params: [[3, 2, 4], 6], expected: [1, 2] },
            { params: [[3, 3], 6], expected: [0, 1] }
        ]
    }
};

function CodingPractice() {
    const { subjectId, topicId } = useParams();
    const isDBMS = subjectId === 'dbms';
    const isTheory = ['os', 'cn', 'software-eng'].includes(subjectId);

    const getProblem = () => {
        if (problemData[topicId]) return problemData[topicId];
        const topicName = topicId ? topicId.charAt(0).toUpperCase() + topicId.slice(1) : 'Practice';
        return {
            title: `${topicName} Implementation`,
            difficulty: 'Medium',
            description: `Implement the core logic for ${topicName}.`,
            examples: [{ input: 'Standard Input', output: 'Expected Result', explanation: 'Demonstrate functional correctness.' }],
            constraints: ['Optimize for complexity', 'Handle edge cases'],
            starterCode: {
                javascript: `function solve(input) {\n    return input;\n}`,
                python: `def solve(input):\n    return input`,
                cpp: `class Solution {\npublic:\n    void solve() {}\n};`,
                java: `class Solution {\n    public void solve() {}\n}`
            }
        };
    };

    const problem = getProblem();
    const initialLang = isDBMS ? 'sql' : 'javascript';
    const [language, setLanguage] = useState(initialLang);
    const [code, setCode] = useState(problem.starterCode[language] || '');
    const [output, setOutput] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (problem.starterCode[language]) {
            setCode(problem.starterCode[language]);
        }
    }, [language, problem]);

    const handleRun = async () => {
        setIsRunning(true);
        setStatus(null);
        setOutput([{ type: 'info', message: 'Preparing submission...' }]);

        try {
            const result = await executeCode(code, language);
            const results = [];
            const { stdout, stderr, time, memory } = result;

            if (stdout) {
                results.push({
                    type: 'success',
                    message: 'Execution Successful',
                    details: stdout
                });
                setStatus('passed');
            } else if (stderr) {
                results.push({
                    type: 'error',
                    message: 'Execution Failed',
                    details: stderr
                });
                setStatus('failed');
            } else {
                results.push({
                    type: 'error',
                    message: 'No Output',
                    details: 'Program executed but produced no output.'
                });
                setStatus('failed');
            }

            if (time !== undefined && memory !== undefined) {
                results.push({
                    type: 'info',
                    message: 'Execution Stats',
                    details: `Time: ${time || '< 0.01'}s | Memory: ${memory || 0}KB`
                });
            }
            setOutput(results);
        } catch (err) {
            setOutput([{
                type: 'error',
                message: 'Error connecting to JDoodle server',
                details: err.message.includes('VITE_JDOODLE_CLIENT_ID')
                    ? 'JDoodle Credentials (ID/Secret) are missing in .env.local'
                    : err.message
            }]);
            setStatus('failed');
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="coding-practice">
            {/* Left: Problem Description */}
            <div className="problem-sidebar">
                <Link to={`/subjects/${subjectId}/${topicId}`} className="btn btn-outline" style={{ marginBottom: '1.5rem', width: 'auto', padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                    <ArrowLeft size={16} />
                    Back
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <h1 style={{ fontSize: '1.75rem', margin: 0 }}>{problem.title}</h1>
                    <span className={`badge badge-${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
                </div>

                <div className="prose">
                    <p style={{ marginBottom: '1.5rem' }}>{problem.description}</p>

                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Info size={18} color="var(--primary)" /> Examples
                    </h3>
                    {problem.examples.map((ex, i) => (
                        <div key={i} className="glass-panel" style={{ padding: '1rem', borderRadius: '12px', marginBottom: '1rem', fontSize: '0.85rem' }}>
                            <div><span style={{ fontWeight: 800 }}>Input:</span> {ex.input}</div>
                            <div><span style={{ fontWeight: 800 }}>Output:</span> {ex.output}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.5rem' }}>// {ex.explanation}</div>
                        </div>
                    ))}

                    <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Constraints</h3>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        {problem.constraints.map((c, idx) => <li key={idx} style={{ marginBottom: '0.5rem' }}>{c}</li>)}
                    </ul>
                </div>
            </div>

            {/* Right: Code Editor & Console */}
            <div className="editor-container">
                <header className="editor-header">
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {!isTheory && (
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="language-select"
                            >
                                {isDBMS ? <option value="sql">SQL</option> : (
                                    <>
                                        <option value="javascript">JavaScript</option>
                                        <option value="python">Python</option>
                                        <option value="cpp">C++</option>
                                        <option value="java">Java</option>
                                    </>
                                )}
                            </select>
                        )}
                        {isTheory && <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)' }}><Cpu size={16} /> PRACTICE MODE</span>}
                    </div>
                    <button onClick={handleRun} disabled={isRunning} className="btn btn-primary" style={{ padding: '0.4rem 1.25rem', fontSize: '0.85rem' }}>
                        {isRunning ? <RotateCcw className="animate-spin" size={16} /> : <Play size={16} />}
                        {isRunning ? 'Running...' : 'Run Code'}
                    </button>
                </header>

                <div className="monaco-editor-wrapper">
                    <Editor
                        height="100%"
                        language={isTheory ? 'markdown' : language}
                        theme="vs-dark"
                        value={code}
                        onChange={(val) => setCode(val)}
                        loading={<div style={{ padding: '2rem', color: 'var(--text-muted)' }}>Loading Workspace...</div>}
                        options={{
                            fontSize: 14,
                            minimap: { enabled: false },
                            automaticLayout: true,
                            padding: { top: 20 },
                            scrollBeyondLastLine: false,
                        }}
                    />
                </div>

                <div className={`console-container ${status}`}>
                    <div className="console-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Terminal size={14} /> CONSOLE
                        </div>
                        {status === 'passed' && <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle2 size={14} /> EXECUTED</span>}
                        {status === 'failed' && <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><XCircle size={14} /> FAILED</span>}
                    </div>
                    <div className="console-body">
                        {output.length === 0 && <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Output will appear here...</span>}
                        {output.map((line, idx) => (
                            <div key={idx} className="console-line">
                                <div className="console-message" style={{ color: line.type === 'success' ? '#10b981' : line.type === 'error' ? '#ef4444' : 'var(--secondary)' }}>
                                    {line.message}
                                </div>
                                {line.details && <pre className="console-details">{line.details}</pre>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodingPractice;
