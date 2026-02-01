import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Youtube, Clock, ExternalLink, Info, Code2, BookOpen } from 'lucide-react';
import { resourcesData } from '../data/learningData';

function LearningResources() {
    const { subjectId, topicId } = useParams();

    // Get resources for the specific topic, fallback to a generator if empty
    let resources = resourcesData[topicId] || [];
    if (resources.length < 8) {
        // Find how many more we need
        const currentCount = resources.length;
        const additionalNeeded = 8 - currentCount;

        const creators = ['Gate Smashers', 'Neso Academy', 'Jenny\'s Lectures', 'Abdul Bari', 'Code With Harry', 'Apna College', 'TechDose', 'Kunal Kushwaha', 'Striver', 'Love Babbar'];
        const topicLabel = topicId.charAt(0).toUpperCase() + topicId.slice(1).replace('-', ' ');

        const additionalResources = Array(additionalNeeded).fill(null).map((_, i) => {
            const creator = creators[(currentCount + i) % creators.length];
            return {
                id: currentCount + i + 1,
                creator: creator,
                title: `${topicLabel} - ${creator} Special`,
                difficulty: 'Intermediate',
                duration: 'Playlist',
                // Generate a YouTube search link if we don't have a specific URL
                url: `https://www.youtube.com/results?search_query=${encodeURIComponent(creator + ' ' + topicLabel + ' playlist')}`
            };
        });
        resources = [...resources, ...additionalResources];
    }

    const topicName = topicId.charAt(0).toUpperCase() + topicId.slice(1).replace('-', ' ');

    return (
        <div className="resources-page py-12">
            <div className="container">
                <Link to={`/subjects/${subjectId}`} className="inline-flex items-center gap-2 text-muted hover:text-primary mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    <span>Back to Topics</span>
                </Link>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{topicName} Resources</h1>
                        <p className="text-muted">High-quality curated content from industry experts.</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <Link to={`/practice/${subjectId}/${topicId}`} className="btn btn-outline p-4 px-8 border-primary text-primary hover:bg-primary hover:text-white">
                            <Code2 size={20} /> Practice
                        </Link>
                        <Link to={`/quiz/${topicId}`} className="btn btn-primary p-4 px-8">
                            Take Topic Quiz
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start gap-3 mb-4">
                        <Info className="text-blue-500 mt-1" size={20} />
                        <p className="text-blue-800 text-sm">
                            <strong>Dynamic Learning:</strong> We've curated at least 8 top-tier resources. Each link opens in a new tab.
                        </p>
                    </div>

                    {resources.map((resource) => (
                        <div key={resource.id} className="card p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-6 w-full md:w-auto">
                                <div className="p-4 rounded-xl bg-red-50 text-red-500">
                                    <Youtube size={40} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">{resource.title}</h3>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                                        <span className="font-semibold text-foreground">{resource.creator}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} /> {resource.duration}</span>
                                        <span className={`badge badge-${resource.difficulty.toLowerCase()}`}>{resource.difficulty}</span>
                                    </div>
                                </div>
                            </div>

                            <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline whitespace-nowrap w-full md:w-auto flex items-center gap-2"
                            >
                                Watch Playlist <ExternalLink size={16} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LearningResources;
