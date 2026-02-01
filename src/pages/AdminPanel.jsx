import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Filter, Settings } from 'lucide-react';

function AdminPanel() {
    const [activeTab, setActiveTab] = useState('subjects');

    const subjects = [
        { name: 'DSA', topics: 12, questions: 120, status: 'Published' },
        { name: 'DBMS', topics: 8, questions: 80, status: 'Published' },
        { name: 'OS', topics: 6, questions: 60, status: 'Draft' },
    ];

    return (
        <div className="admin-page py-12">
            <div className="container">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold">Admin Control Center</h1>
                        <p className="text-muted">Manage your content, subjects, and topics here.</p>
                    </div>
                    <button className="btn btn-primary">
                        <Plus size={20} /> Add New {activeTab === 'subjects' ? 'Subject' : 'Topic'}
                    </button>
                </header>

                <div className="flex border-b border-border mb-8 overflow-x-auto">
                    {['Subjects', 'Topics', 'Questions', 'Resources'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            className={`px-6 py-4 font-semibold whitespace-nowrap border-b-2 transition-all ${activeTab === tab.toLowerCase()
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted hover:text-foreground'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="card p-0 overflow-hidden">
                    <div className="p-4 border-b border-border flex flex-col md:flex-row justify-between gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                            <input type="text" className="input pl-10" placeholder={`Search ${activeTab}...`} />
                        </div>
                        <div className="flex gap-2">
                            <button className="btn btn-outline p-3">
                                <Filter size={18} />
                            </button>
                            <button className="btn btn-outline p-3">
                                <Settings size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-accent">
                                <tr>
                                    <th className="p-4 font-semibold text-sm border-b border-border">Name</th>
                                    <th className="p-4 font-semibold text-sm border-b border-border">Topics</th>
                                    <th className="p-4 font-semibold text-sm border-b border-border">Questions</th>
                                    <th className="p-4 font-semibold text-sm border-b border-border">Status</th>
                                    <th className="p-4 font-semibold text-sm border-b border-border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjects.map((subject, idx) => (
                                    <tr key={idx} className="hover:bg-accent/50 transition-colors">
                                        <td className="p-4 border-b border-border font-bold">{subject.name}</td>
                                        <td className="p-4 border-b border-border">{subject.topics}</td>
                                        <td className="p-4 border-b border-border">{subject.questions}</td>
                                        <td className="p-4 border-b border-border">
                                            <span className={`badge ${subject.status === 'Published' ? 'badge-easy' : 'badge-medium'}`}>
                                                {subject.status}
                                            </span>
                                        </td>
                                        <td className="p-4 border-b border-border">
                                            <div className="flex gap-2">
                                                <button className="p-2 hover:bg-muted rounded-lg text-primary transition-colors">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button className="p-2 hover:bg-muted rounded-lg text-red-500 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 text-center text-sm text-muted">
                        Showing {subjects.length} results
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;
