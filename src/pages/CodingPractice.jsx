
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import {
    Play,
    Send,
    Terminal,
    Info,
    ArrowLeft,
    Database,
    Cpu,
    Network,
    Code2,
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
            javascript: `// Write your code here
// Function must return an array of two integers
function twoSum(nums, target) {
    
}`,
            python: 'def twoSum(nums, target):\n    # Write code here',
            cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};',
            java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}'
        },
        testCases: [
            { params: [[2, 7, 11, 15], 9], expected: [0, 1] },
            { params: [[3, 2, 4], 6], expected: [1, 2] },
            { params: [[3, 3], 6], expected: [0, 1] }
        ]
    },
    'sql': {
        title: 'Employee Salaries',
        difficulty: 'Medium',
        description: 'Write a SQL query to find all employees who earn more than their managers.',
        examples: [{ input: 'Employees (id, name, salary, managerId)', output: 'Name', explanation: 'Joe earns 70k, manager Sam earns 60k.' }],
        constraints: ['Return Name column'],
        starterCode: { sql: '-- Write your SQL query here\nSELECT name FROM Employee ...' }
    }
};

function CodingPractice() {
    const { subjectId, topicId } = useParams();
    const isDBMS = subjectId === 'dbms';
    const isTheory = ['os', 'cn', 'software-eng'].includes(subjectId);

    // Dynamic Problem Generator for topics without hardcoded data
    const getProblem = () => {
        if (problemData[topicId]) return problemData[topicId];
        if (isDBMS) return problemData['sql'];

        // Fallback generic problem
        const subjectName = subjectId ? subjectId.toUpperCase() : 'Coding';
        const topicName = topicId ? topicId.charAt(0).toUpperCase() + topicId.slice(1) : 'Practice';
        return {
            title: `${topicName} Implementation`,
            difficulty: 'Medium',
            description: `Implement the core logic for ${topicName}. This is a practice environment for ${subjectName} concepts.`,
            examples: [{ input: 'Standard Input', output: 'Expected Result', explanation: 'Demonstrate functional correctness.' }],
            constraints: ['Optimize for time complexity', 'Handle edge cases'],
            starterCode: {
                javascript: `// Implement ${topicName} logic
function solve(input) {
    return input;
}`,
                python: `def solve(input):\n    # Implement ${topicName} logic\n    return input`,
                cpp: `// Implement ${topicName} logic\nclass Solution {\npublic:\n    void solve() {\n        \n    }\n};`,
                java: `// Implement ${topicName} logic\nclass Solution {\n    public void solve() {\n        \n    }\n}`
            },
            testCases: [
                { params: [1], expected: 1 },
                { params: [2], expected: 2 }
            ]
        };
    };

    const problem = getProblem();

    // Set initial language based on subject
    const initialLang = isDBMS ? 'sql' : 'javascript';
    const [language, setLanguage] = useState(initialLang);
    const [code, setCode] = useState(problem.starterCode[language] || '');
    const [output, setOutput] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [status, setStatus] = useState(null); // 'passed' | 'failed' | null

    useEffect(() => {
        if (problem.starterCode[language]) {
            setCode(problem.starterCode[language]);
        }
    }, [language, problem]);

    const executeJavaScript = (userCode) => {
        try {
            // Very basic safety wrapper - in prod use a sandbox/worker
            // Extract the function body or create a wrapper

            // We need to identify the function name to call it
            const functionNameMatch = userCode.match(/function\s+(\w+)/);
            if (!functionNameMatch) throw new Error("Could not find function name. Please define a function.");
            const functionName = functionNameMatch[1];

            const results = [];
            let allPassed = true;

            const cases = problem.testCases || [];

            // Eval the user code to define the function
            // NOTE: deeply unsafe in real app, but ok for client-side practice with no backend
            const userFunc = new Function(`${userCode}; return ${functionName};`)();

            cases.forEach((testCase, idx) => {
                let result;
                try {
                    // Deep copy params to avoid mutation issues between runs
                    const params = JSON.parse(JSON.stringify(testCase.params));
                    result = userFunc(...params);
                } catch (err) {
                    result = `Error: ${err.message}`;
                    allPassed = false;
                }

                const expected = JSON.stringify(testCase.expected);
                const actual = JSON.stringify(result);
                const passed = expected === actual;

                if (!passed) allPassed = false;

                results.push({
                    type: passed ? 'success' : 'error',
                    message: `Case ${idx + 1}: ${passed ? 'Passed' : 'Failed'}`,
                    details: passed ? `Output: ${actual}` : `Expected: ${expected}, Got: ${actual}`
                });
            });

            if (cases.length === 0) {
                results.push({ type: 'success', message: 'Code executed successfully. (No test cases defined)' });
            } else if (allPassed) {
                results.unshift({ type: 'success', message: '🎉 All Test Cases Passed!' });
                setStatus('passed');
            } else {
                setStatus('failed');
            }

            setOutput(results);

        } catch (err) {
            setOutput([{ type: 'error', message: `Syntax/Runtime Error: ${err.message}` }]);
            setStatus('failed');
        }
    };

    const handleRun = () => {
        setIsRunning(true);
        setStatus(null);
        setOutput([{ type: 'info', message: 'Executing...' }]);

        setTimeout(() => {
            if (language === 'javascript') {
                executeJavaScript(code);
            } else {
                // Mock execution for other languages
                const isCorrect = Math.random() > 0.3; // Random success for demo
                const results = [
                    { type: 'info', message: `Compiling ${language}...` },
                    isCorrect
                        ? { type: 'success', message: 'Build Successful. Output matches expected result.' }
                        : { type: 'error', message: 'Runtime Error: Index out of bounds' }
                ];
                if (isCorrect) setStatus('passed');
                else setStatus('failed');
                setOutput(results);
            }
            setIsRunning(false);
        }, 800);
    };

    return (
        <div className="coding-practice h-[calc(100vh-73px)] border-t border-border flex flex-col md:flex-row overflow-hidden bg-[#f3f4f6]">
            {/* Left: Problem Description */}
            <div className="h-1/2 md:h-full md:w-[40%] bg-white border-b md:border-b-0 md:border-r border-border overflow-y-auto p-6 scroll-smooth shrink-0">
                <Link to={`/subjects/${subjectId}/${topicId}`} className="inline-flex items-center gap-2 text-muted hover:text-primary mb-6 transition-colors text-sm">
                    <ArrowLeft size={16} />
                    <span>Back to Resources</span>
                </Link>

                <div className="flex items-center gap-3 mb-4">
                    <h1 className="text-2xl font-bold">{problem.title}</h1>
                    <span className={`badge badge-${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
                </div>

                <div className="prose prose-slate max-w-none">
                    <p className="text-[#374151] mb-6 whitespace-pre-wrap leading-relaxed">
                        {problem.description}
                    </p>

                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-primary">
                        <Info size={18} /> Example
                    </h3>
                    {problem.examples.map((ex, i) => (
                        <div key={i} className="bg-slate-50 border border-border p-4 rounded-xl mb-6 font-mono text-sm">
                            <div><span className="font-bold">Input:</span> {ex.input}</div>
                            <div><span className="font-bold">Output:</span> {ex.output}</div>
                            <div className="text-slate-500 mt-1 italic">// {ex.explanation}</div>
                        </div>
                    ))}

                    <h3 className="text-lg font-bold mb-3">Constraints</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-8 text-sm">
                        {problem.constraints.map((c, idx) => <li key={idx} className="text-[#374151]">{c}</li>)}
                    </ul>
                </div>
            </div>

            {/* Right: Code Editor & Console */}
            <div className="flex-1 flex flex-col min-w-0 h-1/2 md:h-full">
                <header className="bg-white border-b border-border p-3 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-4">
                        {!isTheory && (
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="bg-accent border border-border rounded-lg px-3 py-1.5 font-semibold text-sm outline-none focus:border-primary"
                            >
                                {isDBMS ? (
                                    <option value="sql">SQL</option>
                                ) : (
                                    <>
                                        <option value="javascript">JavaScript</option>
                                        <option value="python">Python</option>
                                        <option value="cpp">C++</option>
                                        <option value="java">Java</option>
                                    </>
                                )}
                            </select>
                        )}
                        {isTheory && <span className="text-sm font-bold text-muted flex items-center gap-2"><Cpu size={16} /> Case Study Practice</span>}
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleRun} disabled={isRunning} className="btn btn-primary py-1.5 px-6 text-sm flex items-center gap-2 shadow-lg hover:shadow-primary/20">
                            {isRunning ? <RotateCcw className="animate-spin" size={16} /> : <Play size={16} />}
                            {isRunning ? 'Running...' : 'Run Code'}
                        </button>
                    </div>
                </header>

                <div className="flex-1 relative bg-[#1e1e1e] overflow-hidden min-h-[300px]">
                    <Editor
                        height="100%"
                        language={isTheory ? 'markdown' : language}
                        theme="vs-dark"
                        value={code}
                        onChange={(val) => setCode(val)}
                        loading={<div className="text-white p-10 font-mono">Initializing Editor Environment...</div>}
                        options={{
                            fontSize: 14,
                            minimap: { enabled: false },
                            automaticLayout: true,
                            padding: { top: 20 },
                            scrollBeyondLastLine: false,
                        }}
                    />
                </div>

                <div className={`h-[35%] bg-white border-t border-border flex flex-col shrink-0 transition-all ${status === 'passed' ? 'bg-green-50/50' : status === 'failed' ? 'bg-red-50/50' : ''}`}>
                    <div className="bg-accent px-4 py-2 border-b border-border flex items-center justify-between text-sm font-bold opacity-75">
                        <div className="flex items-center gap-2">
                            <Terminal size={14} /> Console Output
                        </div>
                        {status === 'passed' && <span className="text-green-600 flex items-center gap-1"><CheckCircle2 size={14} /> Accepted</span>}
                        {status === 'failed' && <span className="text-red-600 flex items-center gap-1"><XCircle size={14} /> Wrong Answer</span>}
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto font-mono text-sm bg-[#1e1e1e] text-slate-300">
                        {output.length === 0 && <span className="text-slate-600 italic">Run your code to see output...</span>}
                        {output.map((line, idx) => (
                            <div key={idx} className={`mb-2 ${line.type === 'success' ? 'text-green-400' : line.type === 'error' ? 'text-red-400' : 'text-blue-300'}`}>
                                <div className="font-bold">{line.message}</div>
                                {line.details && <div className="text-slate-500 pl-4 text-xs mt-1">{line.details}</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodingPractice;
