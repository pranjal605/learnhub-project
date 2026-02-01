import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, PlayCircle, CheckCircle2, ExternalLink, BookOpen } from 'lucide-react';
import { learningData } from '../data/learningData';

function TopicSelection() {
    const { subjectId } = useParams();
    const subjectContent = learningData[subjectId];
    const topics = subjectContent?.topics || [];
    const subjectInfo = learningData.subjects.find(s => s.id === subjectId);
    const subjectName = subjectInfo?.name || subjectId.toUpperCase();

    return (
        <div className="topics-page py-12">
            <div className="container">
                <Link to="/subjects" className="inline-flex items-center gap-2 text-muted hover:text-primary mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    <span>Back to Subjects</span>
                </Link>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="mb-10">
                            <h1 className="text-3xl font-bold mb-2">{subjectName} Topics</h1>
                            <p className="text-muted">Master {subjectName} step-by-step with curated learning paths.</p>
                        </div>

                        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                            {topics.map((topic) => (
                                <div key={topic.id} className="card flex items-center justify-between p-6 hover:border-primary transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                            <PlayCircle size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold">{topic.name}</h3>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className={`badge badge-${topic.difficulty.toLowerCase()}`}>
                                                    {topic.difficulty}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <Link to={`/subjects/${subjectId}/${topic.id}`} className="btn btn-primary">
                                        Start Learning
                                    </Link>
                                </div>
                            ))}
                        </div>
                        {topics.length === 0 && (
                            <div className="text-center py-20 card bg-accent">
                                <BookOpen size={48} className="text-muted mb-4 mx-auto" />
                                <h3 className="text-xl font-bold mb-2">No topics found</h3>
                                <p className="text-muted">We're still curating content for this subject.</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar for DSA */}
                    {subjectId === 'dsa' && subjectContent?.sheets && (
                        <div className="lg:w-80 shrink-0">
                            <div className="card p-6 sticky top-24 border-primary/20 bg-blue-50/30">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <BookOpen size={20} className="text-primary" />
                                    Popular DSA Sheets
                                </h2>
                                <div className="space-y-4">
                                    {subjectContent.sheets.map((sheet, idx) => (
                                        <a
                                            key={idx}
                                            href={sheet.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-3 rounded-lg bg-white border border-border hover:border-primary hover:text-primary transition-all group"
                                        >
                                            <span className="font-medium text-sm">{sheet.name}</span>
                                            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    ))}
                                </div>
                                <div className="mt-8 p-4 bg-primary/10 rounded-xl">
                                    <p className="text-xs text-primary font-bold uppercase tracking-wider mb-2">Pro Tip</p>
                                    <p className="text-xs text-primary/80 leading-relaxed">
                                        Following a curated sheet is the fastest way to master problem solving for interviews.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TopicSelection;
