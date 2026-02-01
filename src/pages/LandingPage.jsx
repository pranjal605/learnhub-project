
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    Youtube,
    GraduationCap,
    BarChart3,
    ArrowRight,
    MessageSquare,
    Send,
    Gamepad2,
    Brain,
    Dices,
    CheckCircle2,
    Sparkles,
    User,
    BookOpen,
    Trophy,
    Target,
    X,

    Code
} from 'lucide-react';

const GameWinScreen = ({ restart, msg }) => (
    <div className="animate-fade-in py-4">
        <div className="p-4 rounded-full bg-primary/20 text-primary w-fit mx-auto mb-6">
            <CheckCircle2 size={48} />
        </div>
        <h4 className="text-2xl font-bold mb-2">System Optimized</h4>
        <p className="text-muted mb-8">{msg}</p>
        <button className="btn btn-outline w-full" onClick={restart}>
            New Exercise
        </button>
    </div>
);

function LandingPage() {
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { role: 'ai', text: 'Welcome to LearnHub Future. I am your AI architect. How can I facilitate your learning today?' }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        scrollToBottom();
    }, [chatMessages, isTyping]);

    const handleSendMessage = () => {
        if (!chatInput.trim()) return;

        const userMsg = chatInput;
        const newMessages = [...chatMessages, { role: 'user', text: userMsg }];
        setChatMessages(newMessages);
        setChatInput('');
        setIsTyping(true);

        setTimeout(() => {
            setChatMessages(prev => [...prev, {
                role: 'ai',
                text: getMockResponse(userMsg)
            }]);
            setIsTyping(false);
        }, 1200);
    };

    const getMockResponse = (input) => {
        const lower = input.toLowerCase();
        if (lower.match(/\b(hi|hello|hey|greetings|gm|gn)\b/)) {
            return "Greetings! I'm your AI Guide. Ready to accelerate your career? What tech stack are you targeting?";
        }
        if (lower.includes('project') || lower.includes('about')) {
            return "LearnHub is a next-gen career accelerator. We combine AI-driven roadmaps, real-world simulations, and elite curriculum.";
        }
        if (lower.includes('help') || lower.includes('how')) {
            return "Start by exploring 'Subjects' for core logic, or use the 'Career Navigator' to get a personalized AI roadmap.";
        }
        return "I am processing your request. My neural networks adapt to your learning style. Shall we solve a coding challenge?";
    };

    const companies = ['Google', 'Amazon', 'Apple', 'Netflix', 'Meta', 'Microsoft', 'Adobe', 'Uber'];

    const [activeGame, setActiveGame] = useState(null);
    const [mathProblem, setMathProblem] = useState({ q: '', a: 0 });
    const [userGuess, setUserGuess] = useState('');
    const [gameState, setGameState] = useState('playing');

    const [sequence, setSequence] = useState([]);
    const [userSequence, setUserSequence] = useState([]);
    const [patternLevel, setPatternLevel] = useState(1);

    // Pattern Game State
    const [patternQuestion, setPatternQuestion] = useState({ q: '', a: '' });

    const startMathGame = () => {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 20) + 1;
        setMathProblem({ q: `${num1} + ${num2}`, a: num1 + num2 });
        setUserGuess('');
        setGameState('playing');
        setActiveGame('Math Puzzle');
    };

    const startMemoryGame = () => {
        const newSeq = Array(5).fill(0).map(() => Math.floor(Math.random() * 9) + 1);
        setSequence(newSeq);
        setUserSequence([]);
        setGameState('memorize'); // memorize -> recall -> won/lost
        setActiveGame('Memory Stack');
        setTimeout(() => setGameState('recall'), 3000);
    };

    const startPatternGame = () => {
        // Simple number sequences
        const start = Math.floor(Math.random() * 10) + 1;
        const diff = Math.floor(Math.random() * 5) + 1;
        const q = `${start}, ${start + diff}, ${start + diff * 2}, ?`;
        setPatternQuestion({ q, a: (start + diff * 3).toString() });
        setUserGuess('');
        setGameState('playing');
        setActiveGame('Pattern Recognition');
    };

    const checkAnswer = () => {
        if (activeGame === 'Math Puzzle') {
            if (parseInt(userGuess) === mathProblem.a) setGameState('won');
            else alert('Incorrect. Logic gate mismatch.');
        } else if (activeGame === 'Pattern Recognition') {
            if (userGuess === patternQuestion.a) setGameState('won');
            else alert('Pattern mismatch detected.');
        } else if (activeGame === 'Memory Stack') {
            const isMatch = userSequence.join('') === sequence.join('');
            if (isMatch) setGameState('won');
            else {
                alert(`Memory corruption. Correct sequence: ${sequence.join('')}`);
                setGameState('lost');
            }
        }
    };

    return (
        <div className="landing-page overflow-x-hidden">
            {/* Game Modal */}
            {activeGame && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
                    <div className="card max-w-sm w-full relative border-primary/50 shadow-glow">
                        <button onClick={() => setActiveGame(null)} className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                        <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                            <Gamepad2 /> {activeGame}
                        </h3>

                        {activeGame === 'Math Puzzle' && (
                            <div className="text-center">
                                {gameState === 'playing' ? (
                                    <>
                                        <div className="p-8 bg-bg-darker rounded-xl border border-glass-border mb-8 text-4xl font-mono font-bold text-white">
                                            {mathProblem.q} = ?
                                        </div>
                                        <input type="number" autoFocus className="input text-center text-3xl font-bold mb-8 h-20" value={userGuess} onChange={(e) => setUserGuess(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && checkAnswer()} />
                                        <button className="btn btn-primary w-full" onClick={checkAnswer}>Verify Calculation</button>
                                    </>
                                ) : <GameWinScreen restart={startMathGame} msg="Arithmetic Logic Unit verified." />}
                            </div>
                        )}

                        {activeGame === 'Pattern Recognition' && (
                            <div className="text-center">
                                {gameState === 'playing' ? (
                                    <>
                                        <div className="p-8 bg-bg-darker rounded-xl border border-glass-border mb-8 text-4xl font-mono font-bold text-white">
                                            {patternQuestion.q}
                                        </div>
                                        <input type="number" autoFocus className="input text-center text-3xl font-bold mb-8 h-20" value={userGuess} onChange={(e) => setUserGuess(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && checkAnswer()} />
                                        <button className="btn btn-primary w-full" onClick={checkAnswer}>Predict Next Sequence</button>
                                    </>
                                ) : <GameWinScreen restart={startPatternGame} msg="Pattern matching algorithms optimized." />}
                            </div>
                        )}

                        {activeGame === 'Memory Stack' && (
                            <div className="text-center">
                                {gameState === 'memorize' && (
                                    <div className="p-8 bg-bg-darker rounded-xl border border-glass-border mb-8 text-4xl font-mono font-bold text-white tracking-[1em] animate-pulse">
                                        {sequence.join('')}
                                    </div>
                                )}
                                {gameState === 'recall' && (
                                    <>
                                        <div className="p-8 bg-bg-darker rounded-xl border border-glass-border mb-8 text-sm text-muted">
                                            Enter the 5-digit sequence...
                                        </div>
                                        <input type="number" autoFocus className="input text-center text-3xl font-bold mb-8 h-20"
                                            value={userGuess}
                                            onChange={(e) => {
                                                setUserGuess(e.target.value);
                                                setUserSequence(e.target.value.split('').map(Number));
                                            }}
                                            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                        />
                                        <button className="btn btn-primary w-full" onClick={checkAnswer}>Stack Push</button>
                                    </>
                                )}
                                {gameState === 'won' && <GameWinScreen restart={startMemoryGame} msg="Cache integrity verified." />}
                                {gameState === 'lost' && (
                                    <div>
                                        <div className="p-4 rounded-full bg-red-500/20 text-red-500 w-fit mx-auto mb-6"><XCircle size={48} /></div>
                                        <h4 className="text-2xl font-bold mb-2">Stack Overflow</h4>
                                        <button className="btn btn-outline w-full mt-6" onClick={startMemoryGame}>Reboot System</button>
                                    </div>
                                )}
                            </div>
                        )}
                        {activeGame !== 'Math Puzzle' && (
                            <div className="text-center py-10">
                                <Sparkles className="mx-auto text-accent mb-6" size={48} />
                                <p className="font-bold text-xl mb-2">Module compiling...</p>
                                <p className="text-sm text-muted mb-8">This simulation is loading into memory.</p>
                                <button className="btn btn-outline w-full" onClick={() => setActiveGame(null)}>Abort</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center relative pt-20">
                {/* Background Blobs */}
                <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] -z-10"></div>

                <div className="container text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glass-border bg-glass mb-8 animate-fade-in">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                        <span className="text-sm font-medium text-text-muted">Next-Gen Learning Platform</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight animate-fade-in">
                        Master the Future of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                            Engineering
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        Transform your career with AI-driven roadmaps, real-time analytics, and elite curriculum designed for 1% developers.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        <Link to="/career-navigator" className="btn btn-primary px-8 py-4 text-lg">
                            <Sparkles size={20} />
                            Launch Career Navigator
                        </Link>
                        <Link to="/subjects" className="btn btn-outline px-8 py-4 text-lg">
                            Explore Curriculum <ArrowRight size={20} />
                        </Link>
                    </div>

                    {/* Stats/Logos */}
                    <div className="mt-20 pt-10 border-t border-glass-border animate-fade-in" style={{ animationDelay: '0.6s' }}>
                        <p className="text-sm text-text-muted mb-6 uppercase tracking-widest">Trusted by efficient learners from</p>
                        <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            {companies.map(company => (
                                <span key={company} className="text-xl font-bold text-white hover:text-primary transition-colors cursor-default">
                                    {company}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-32 relative">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="card hover:border-primary/50 group">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                <BookOpen size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Smart Curriculum</h3>
                            <p className="text-text-muted leading-relaxed">
                                Adaptive learning paths that evolve with your progress. Stop wasting time on what you already know.
                            </p>
                        </div>
                        <div className="card hover:border-secondary/50 group">
                            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                                <Target size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Precision Ops</h3>
                            <p className="text-text-muted leading-relaxed">
                                Real-world simulations and coding challenges that benchmark your skills against industry standards.
                            </p>
                        </div>
                        <div className="card hover:border-accent/50 group">
                            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                                <BarChart3 size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Neural Analytics</h3>
                            <p className="text-text-muted leading-relaxed">
                                Deep insights into your cognitive performance, identifying gaps before they become blockers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>



            {/* Neural Reload (Games) */}
            <section className="py-24 border-t border-glass-border bg-bg-darker">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold mb-16">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Neural Reload</span> Protocol
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: 'Memory Stack', icon: <Brain />, desc: 'Optimize retention buffers.' },
                            { title: 'Math Puzzle', icon: <Dices />, desc: 'Calibrate logic gates.' },
                            { title: 'Pattern Recognition', icon: <Gamepad2 />, desc: 'Predict output sequences.' }
                        ].map((game, i) => (
                            <div key={i} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
                                <div className="card relative h-full flex flex-col items-center justify-center bg-bg-dark aspect-square hover:-translate-y-2">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-white/10 group-hover:text-accent">
                                        {game.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                                    <p className="text-sm text-text-muted mb-8">{game.desc}</p>
                                    <button
                                        className="btn btn-outline text-xs px-6 py-2"
                                        onClick={() => {
                                            if (game.title === 'Math Puzzle') startMathGame();
                                            else if (game.title === 'Memory Stack') startMemoryGame();
                                            else if (game.title === 'Pattern Recognition') startPatternGame();
                                        }}
                                    >
                                        INITIALIZE
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </div>
    );
}

export default LandingPage;
