import { Link } from 'react-router-dom';
import { Database, Network, Cpu, Code2, Layout, Boxes } from 'lucide-react';
import { learningData } from '../data/learningData';

const iconMap = {
    'dsa': <Boxes size={32} />,
    'dbms': <Database size={32} />,
    'os': <Cpu size={32} />,
    'cn': <Network size={32} />,
    'webdev': <Layout size={32} />,
    'software-eng': <Code2 size={32} />
};

const subjectDescriptions = {
    'dsa': 'Master problem-solving with data structures and efficient algorithms.',
    'dbms': 'Learn relational databases, SQL queries, and normalization.',
    'os': 'Explore process management, memory allocation, and OS concepts.',
    'cn': 'Understand networking layers, TCP/IP, and internet protocols.',
    'webdev': 'Build responsive websites using HTML, CSS, and JavaScript.',
    'software-eng': 'SDLC models, agile methodologies, and design patterns.'
};

function SubjectSelection() {
    const subjects = learningData.subjects.map(s => ({
        ...s,
        icon: iconMap[s.id] || <Layout size={32} />,
        description: subjectDescriptions[s.id] || 'Explore curated topics and resources.'
    }));

    return (
        <div className="subjects-page py-12">
            <div className="container">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold mb-2">Select a Subject</h1>
                    <p className="text-muted">Choose a stream to explore curated topics and resources.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {subjects.map((subject) => (
                        <Link key={subject.id} to={`/subjects/${subject.id}`} className="card flex flex-col items-center text-center p-8 hover:border-primary transition-all">
                            <div
                                className="p-4 rounded-2xl mb-6 text-white"
                                style={{ backgroundColor: subject.color }}
                            >
                                {subject.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{subject.name}</h3>
                            <p className="text-muted mb-6">{subject.description}</p>
                            <span className="btn btn-outline w-full group-hover:bg-primary group-hover:text-white">
                                Explore Topics
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SubjectSelection;
