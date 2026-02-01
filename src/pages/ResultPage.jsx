import { useSearchParams, Link, useParams } from 'react-router-dom';
import { CheckCircle2, XCircle, BarChart3, RotateCcw, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const quizReview = {
    'arrays': [
        { id: 1, question: 'What is the time complexity to access an array element by index?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], correct: 0, explanation: 'Array elements are stored in contiguous memory locations, allowing O(1) access time via the base address and index multiplied by element size.' },
        { id: 2, question: 'Which index represents the third element in a zero-indexed array?', options: ['1', '2', '3', '4'], correct: 1, explanation: 'In zero-indexing, the first element is 0, second is 1, and third is 2.' },
        { id: 3, question: 'Which of the following describes a contiguous memory allocation?', options: ['Linked List', 'Stack', 'Array', 'Queue'], correct: 2, explanation: 'Arrays allocate memory in a single continuous block, unlike linked lists which use non-contiguous blocks.' },
        { id: 4, question: 'Time complexity for searching an element in a sorted array using Binary Search?', options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'], correct: 2, explanation: 'Binary search repeatedly divides the search interval in half, leading to logarithmic time complexity.' },
        { id: 5, question: 'Space complexity of a 1D array of size N?', options: ['O(1)', 'O(N)', 'O(N^2)', 'O(log N)'], correct: 1, explanation: 'A 1D array of size N takes space proportional to N, hence O(N).' }
    ],
    'linked-list': [
        { id: 1, question: 'Time complexity to insert at the beginning of a Singly Linked List?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], correct: 0, explanation: 'Inserting at the beginning only requires updating the new node\'s next pointer and the head pointer, which is independent of N.' }
    ],
    'db-basics': [
        { id: 1, question: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Question Language', 'Standard Query List', 'Sequential Query Loop'], correct: 0, explanation: 'SQL is the standard language for dealing with Relational Databases.' }
    ],
    'os-concepts': [
        { id: 1, question: 'Which of the following is NOT an Operating System?', options: ['Windows', 'Linux', 'Oracle', 'macOS'], correct: 2, explanation: 'Oracle is a database software company, not an operating system.' }
    ]
};

function ResultPage() {
    const { topicId } = useParams();
    const [searchParams] = useSearchParams();
    const score = searchParams.get('score');
    const total = searchParams.get('total');
    const percentage = (score / total) * 100;

    const [expanded, setExpanded] = useState(null);

    return (
        <div className="result-page py-12">
            <div className="container max-w-2xl text-center">
                <div className="mb-10 animate-fade-in">
                    <div className="inline-flex p-4 rounded-full bg-green-100 text-green-600 mb-6">
                        <CheckCircle2 size={64} />
                    </div>
                    <h1 className="text-4xl font-bold mb-2">Quiz Completed!</h1>
                    <p className="text-muted">Great job! You've successfully finished the {topicId} quiz.</p>
                </div>

                <div className="card p-8 mb-10 border-2 border-primary bg-primary/5 flex flex-col md:flex-row justify-around items-center gap-6">
                    <div className="text-center">
                        <span className="text-sm font-bold text-muted uppercase tracking-wider">Your Score</span>
                        <div className="text-5xl font-bold text-primary mt-1">{score}/{total}</div>
                    </div>
                    <div className="h-12 w-[1px] bg-border hidden md:block"></div>
                    <div className="text-center">
                        <span className="text-sm font-bold text-muted uppercase tracking-wider">Accuracy</span>
                        <div className="text-5xl font-bold text-primary mt-1">{Math.round(percentage)}%</div>
                    </div>
                    <div className="h-12 w-[1px] bg-border hidden md:block"></div>
                    <div className="text-center">
                        <span className="text-sm font-bold text-muted uppercase tracking-wider">XP Earned</span>
                        <div className="text-5xl font-bold text-primary mt-1">+{score * 10}</div>
                    </div>
                </div>

                <div className="space-y-4 mb-10 text-left">
                    <h3 className="text-xl font-bold mb-4">Review Answers</h3>
                    {quizReview[topicId]?.map((item, idx) => (
                        <div key={item.id} className="card p-4 border-l-4 border-green-500">
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => setExpanded(expanded === idx ? null : idx)}
                            >
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="text-green-500" size={20} />
                                    <span className="font-semibold">{item.question}</span>
                                </div>
                                <ChevronDown size={20} className={`text-muted transition-transform ${expanded === idx ? 'rotate-180' : ''}`} />
                            </div>

                            {expanded === idx && (
                                <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                                    <p className="text-muted text-sm bg-muted p-3 rounded-lg">
                                        <strong>Explanation:</strong> {item.explanation}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    <Link to={`/quiz/${topicId}`} className="btn btn-outline p-4 px-8">
                        <RotateCcw size={18} /> Retry Quiz
                    </Link>
                    <Link to="/dashboard" className="btn btn-primary p-4 px-8">
                        <LayoutDashboard size={18} /> Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ResultPage;
