import { User, Award, Flame, Calendar, BookOpen, CheckCircle2, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

function ProfileDashboard() {
    // Dummy user data
    const user = {
        name: 'Soniya',
        username: 'soniyaj2004',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Soniya',
        joinedDate: 'Jan 2026',
        streak: 5,
        solvedProblems: 42,
        quizzesCompleted: 15,
        accuracy: 85,
        subjects: [
            { id: 'dsa', name: 'DSA', progress: 65, color: '#3b82f6' },
            { id: 'dbms', name: 'DBMS', progress: 80, color: '#10b981' },
            { id: 'os', name: 'OS', progress: 40, color: '#f59e0b' },
            { id: 'cn', name: 'CN', progress: 20, color: '#ef4444' },
            { id: 'webdev', name: 'Web Dev', progress: 95, color: '#8b5cf6' },
            { id: 'software-eng', name: 'SE', progress: 10, color: '#ec4899' }
        ],
        achievements: [
            { id: 1, name: 'First Quiz', icon: <Award size={24} />, color: '#fbbf24', desc: 'Completed first topic quiz' },
            { id: 2, name: '7-Day Streak', icon: <Flame size={24} />, color: '#f87171', desc: 'Maintained 7 day streak' },
            { id: 3, name: 'DSA Beginner', icon: <Target size={24} />, color: '#60a5fa', desc: 'Solved 10 DSA problems' },
            { id: 4, name: 'Consistent', icon: <TrendingUp size={24} />, color: '#34d399', desc: 'Solved problems for 30 days' }
        ]
    };

    return (
        <div className="profile-page py-12 bg-[#f8fafc] min-h-screen">
            <div className="container">
                <div className="grid lg:grid-cols-12 gap-8">

                    {/* Left: Profile Overview */}
                    <div className="lg:col-span-4">
                        <div className="card text-center p-8 sticky top-24">
                            <div className="relative inline-block mb-6">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-24 h-24 rounded-3xl border-4 border-white shadow-lg mx-auto bg-blue-50"
                                />
                                <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-xl shadow-md border border-border">
                                    <Flame className="text-orange-500" size={16} />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                            <p className="text-muted mb-6">@{user.username}</p>

                            <div className="flex flex-col gap-4 text-sm mb-8">
                                <div className="flex items-center justify-between p-3 rounded-xl bg-accent border border-border">
                                    <span className="text-muted flex items-center gap-2"><Calendar size={16} /> Joined</span>
                                    <span className="font-bold">{user.joinedDate}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-xl bg-orange-50 border border-orange-100">
                                    <span className="text-orange-700 font-bold flex items-center gap-2"><Flame size={16} /> Current Streak</span>
                                    <span className="text-orange-700 font-bold">{user.streak} Days</span>
                                </div>
                            </div>

                            <Link to="/dashboard" className="btn btn-primary w-full py-4 mb-4">Edit Profile</Link>
                            <button className="btn btn-outline w-full py-4">Share Portfolio</button>
                        </div>
                    </div>

                    {/* Right: Detailed Stats */}
                    <div className="lg:col-span-8 flex flex-col gap-8">

                        {/* Stats Section */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="card p-6 border-l-4 border-l-blue-500">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
                                        <BookOpen size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted font-bold uppercase tracking-wider">Attempted</p>
                                        <h3 className="text-2xl font-bold">{user.solvedProblems}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-6 border-l-4 border-l-green-500">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-green-50 text-green-500 rounded-xl">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted font-bold uppercase tracking-wider">Quizzes</p>
                                        <h3 className="text-2xl font-bold">{user.quizzesCompleted}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-6 border-l-4 border-l-purple-500">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-purple-50 text-purple-500 rounded-xl">
                                        <TrendingUp size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted font-bold uppercase tracking-wider">Accuracy</p>
                                        <h3 className="text-2xl font-bold">{user.accuracy}%</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Subject Progress */}
                        <div className="card p-8">
                            <h3 className="text-xl font-bold mb-8">Subject Progress</h3>
                            <div className="space-y-8">
                                {user.subjects.map((subj) => (
                                    <div key={subj.id}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-sm uppercase tracking-wider">{subj.name}</span>
                                            <span className="text-sm font-bold" style={{ color: subj.color }}>{subj.progress}%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-1000"
                                                style={{ width: `${subj.progress}%`, backgroundColor: subj.color }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Achievements */}
                        <div className="card p-8">
                            <h3 className="text-xl font-bold mb-8">Badges & Achievements</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {user.achievements.map((ach) => (
                                    <div key={ach.id} className="flex items-center gap-4 p-4 rounded-2xl bg-accent border border-border group hover:border-primary transition-all">
                                        <div
                                            className="p-4 rounded-xl shadow-sm text-white transition-transform group-hover:scale-110"
                                            style={{ backgroundColor: ach.color }}
                                        >
                                            {ach.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold leading-none mb-1">{ach.name}</h4>
                                            <p className="text-xs text-muted">{ach.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileDashboard;
