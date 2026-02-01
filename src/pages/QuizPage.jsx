import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HelpCircle, Clock, ChevronRight, ChevronLeft, Info } from 'lucide-react';
import { quizData } from '../data/learningData';

function QuizPage() {
    const { topicId } = useParams();
    const navigate = useNavigate();

    // Fallback quiz data if specific topic quiz isn't defined yet
    const questions = quizData[topicId] || [
        { id: 1, question: `Which of the following is most relevant to ${topicId}?`, options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 0, explanation: 'This is a foundational concept in this topic.' },
        { id: 2, question: `What is the primary goal of studying ${topicId}?`, options: ['Efficiency', 'Scalability', 'Security', 'All of the above'], correct: 3, explanation: 'Modern software requires all these attributes.' }
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleOptionSelect = (optionIndex) => {
        if (isSubmitted) return;
        setAnswers({ ...answers, [currentQuestion]: optionIndex });
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setIsSubmitted(true);
        }
    };

    const handleFinish = () => {
        const score = questions.reduce((acc, q, idx) => acc + (answers[idx] === q.correct ? 1 : 0), 0);
        navigate(`/result/${topicId}?score=${score}&total=${questions.length}`);
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <div className="quiz-page py-12 bg-accent min-h-[calc(100vh-73px)]">
            <div className="container max-w-3xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <HelpCircle className="text-primary" />
                            {topicId.charAt(0).toUpperCase() + topicId.slice(1)} Quiz
                        </h1>
                    </div>
                </div>

                <div className="w-full bg-border h-2 rounded-full mb-8">
                    <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <div className="card p-8 animate-fade-in">
                    <div className="mb-8">
                        <span className="text-sm font-bold text-primary mb-2 block">Question {currentQuestion + 1} of {questions.length}</span>
                        <h3 className="text-xl font-semibold leading-relaxed">
                            {questions[currentQuestion].question}
                        </h3>
                    </div>

                    <div className="flex flex-col gap-4 mb-6">
                        {questions[currentQuestion].options.map((option, index) => {
                            const isSelected = answers[currentQuestion] === index;
                            const isCorrect = questions[currentQuestion].correct === index;

                            let borderClass = 'border-border hover:border-primary-hover';
                            let bgClass = '';

                            if (isSelected) {
                                borderClass = 'border-primary bg-blue-50';
                            }

                            if (isSubmitted) {
                                if (isCorrect) {
                                    borderClass = 'border-green-500 bg-green-50';
                                } else if (isSelected) {
                                    borderClass = 'border-red-500 bg-red-50';
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleOptionSelect(index)}
                                    className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${borderClass} ${bgClass}`}
                                    disabled={isSubmitted}
                                >
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'bg-primary border-primary' : 'border-border'}`}>
                                        {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                                    </div>
                                    <span className="font-medium">{option}</span>
                                </button>
                            );
                        })}
                    </div>

                    {isSubmitted && (
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-8 flex gap-3">
                            <Info className="text-blue-500 shrink-0" size={20} />
                            <div>
                                <p className="font-bold text-blue-900 text-sm mb-1">Explanation:</p>
                                <p className="text-blue-800 text-sm">{questions[currentQuestion].explanation}</p>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between items-center gap-4">
                        <button
                            onClick={handlePrev}
                            disabled={currentQuestion === 0}
                            className="btn btn-outline px-6 disabled:opacity-50"
                        >
                            <ChevronLeft size={20} /> Previous
                        </button>

                        {!isSubmitted ? (
                            <button
                                onClick={handleNext}
                                disabled={answers[currentQuestion] === undefined}
                                className="btn btn-primary px-8"
                            >
                                {currentQuestion === questions.length - 1 ? 'Show Results' : 'Next'} <ChevronRight size={20} />
                            </button>
                        ) : (
                            <div className="flex gap-4">
                                {currentQuestion < questions.length - 1 ? (
                                    <button onClick={() => setCurrentQuestion(currentQuestion + 1)} className="btn btn-outline px-6">Next Question</button>
                                ) : (
                                    <button onClick={handleFinish} className="btn btn-primary px-8">Finish Quiz</button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuizPage;
