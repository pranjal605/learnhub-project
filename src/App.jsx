import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import SubjectSelection from './pages/SubjectSelection';
import TopicSelection from './pages/TopicSelection';
import LearningResources from './pages/LearningResources';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import CodingPractice from './pages/CodingPractice';
import ProfileDashboard from './pages/ProfileDashboard';
import Navbar from './components/Navbar';
import AICareerNavigator from './pages/AICareerNavigator';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/career-navigator" element={<AICareerNavigator />} />
                        <Route path="/subjects" element={<SubjectSelection />} />
                        <Route path="/subjects/:subjectId" element={<TopicSelection />} />
                        <Route path="/subjects/:subjectId/:topicId" element={<LearningResources />} />
                        <Route path="/quiz/:topicId" element={<QuizPage />} />
                        <Route path="/result/:topicId" element={<ResultPage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/practice/:subjectId/:topicId" element={<CodingPractice />} />
                        <Route path="/profile" element={<ProfileDashboard />} />
                        <Route path="/admin" element={<AdminPanel />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
