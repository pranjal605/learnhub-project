import { Link } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    Trophy,
    Flame,
    Clock,
    CheckCircle,
    AlertCircle,
    TrendingUp,
    LogOut
} from 'lucide-react';

function Dashboard() {
    const stats = [
        { label: 'Topics Completed', value: '12', icon: <CheckCircle className="text-green-500" />, color: 'bg-green-50' },
        { label: 'Avg. Quiz Score', value: '84%', icon: <Trophy className="text-yellow-500" />, color: 'bg-yellow-50' },
        { label: 'Learning Streak', value: '5 Days', icon: <Flame className="text-orange-500" />, color: 'bg-orange-50' },
        { label: 'Time Spent', value: '18h 30m', icon: <Clock className="text-blue-500" />, color: 'bg-blue-50' },
    ];

    const recentActivity = [
        { topic: 'Arrays', subject: 'DSA', score: '9/10', date: 'Today' },
        { topic: 'SQL Joins', subject: 'DBMS', score: '7/10', date: 'Yesterday' },
        { topic: 'OS Scheduling', subject: 'OS', score: '8/10', date: '2 days ago' },
    ];

    const weakTopics = [
        { topic: 'Recursion', subject: 'DSA', score: '40%', icon: <AlertCircle size={16} /> },
        { topic: 'Normalization', subject: 'DBMS', score: '55%', icon: <AlertCircle size={16} /> },
    ];

    return (
        <div className="dashboard-container flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border h-[calc(100vh-73px)] p-6 bg-accent hidden lg:block">
                <nav className="flex flex-col gap-2">
                    <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded-xl bg-primary text-white font-semibold">
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/subjects" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <BookOpen size={20} />
                        <span>Subjects</span>
                    </Link>
                    <Link to="/auth" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground mt-auto">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto h-[calc(100vh-73px)]">
                <div className="max-w-5xl mx-auto">
                    <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold">Student Dashboard</h1>
                            <p className="text-muted">Welcome back, Soniy! Track your learning progress here.</p>
                        </div>
                        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full font-semibold border border-green-100">
                            <TrendingUp size={18} />
                            <span>Up 15% from last week</span>
                        </div>
                    </header>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {stats.map((stat, idx) => (
                            <div key={idx} className={`card ${stat.color} border-none flex flex-col gap-2 p-6`}>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-muted-foreground uppercase">{stat.label}</span>
                                    {stat.icon}
                                </div>
                                <div className="text-3xl font-bold">{stat.value}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Recent Activity */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="card">
                                <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                                <div className="space-y-4">
                                    {recentActivity.map((activity, idx) => (
                                        <div key={idx} className="flex justify-between items-center p-4 rounded-xl border border-border hover:bg-accent transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-white rounded-lg border border-border">
                                                    <BookOpen size={20} className="text-primary" />
                                                </div>
                                                <div>
                                                    <div className="font-bold">{activity.topic}</div>
                                                    <div className="text-xs text-muted">{activity.subject} • {activity.date}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-primary">{activity.score}</div>
                                                <div className="text-xs text-muted font-medium">Quiz Score</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link to="/subjects" className="btn btn-outline w-full mt-6">View All Subjects</Link>
                            </div>
                        </div>

                        {/* Sidebar Cards */}
                        <div className="space-y-6">
                            <div className="card">
                                <h3 className="text-lg font-bold mb-4">Action Needed</h3>
                                <div className="space-y-4">
                                    {weakTopics.map((topic, idx) => (
                                        <div key={idx} className="flex flex-col gap-2">
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-sm">{topic.topic}</span>
                                                <span className="text-xs font-bold text-red-500 flex items-center gap-1">
                                                    {topic.icon} {topic.score}
                                                </span>
                                            </div>
                                            <div className="w-full bg-border h-1.5 rounded-full">
                                                <div className="bg-red-500 h-1.5 rounded-full" style={{ width: topic.score }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-muted mt-4">These topics need more practice based on your recent quiz scores.</p>
                            </div>

                            <div className="card bg-primary text-white border-none">
                                <h3 className="text-lg font-bold mb-2">Keep it up!</h3>
                                <p className="text-sm opacity-90 mb-4">You're in the top 5% of learners this week. Complete more quizzes to earn badges.</p>
                                <div className="p-4 bg-white/10 rounded-xl flex items-center gap-3">
                                    <Trophy size={32} />
                                    <div>
                                        <div className="font-bold">Mastery Level 4</div>
                                        <div className="text-xs opacity-75">120 XP to Level 5</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
