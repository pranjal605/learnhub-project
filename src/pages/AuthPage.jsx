import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate auth
        navigate('/subjects');
    };

    return (
        <div className="auth-page py-20 bg-accent min-h-[calc(100vh-73px)] flex items-center">
            <div className="container max-w-md">
                <div className="card animate-fade-in">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                        <p className="text-muted mt-2">
                            {isLogin ? 'Enter your credentials to continue learning.' : 'Join LearnHub and start your learning journey.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {!isLogin && (
                            <div className="form-group">
                                <label className="text-sm font-semibold mb-1 block">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        className="input pl-10"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="form-group">
                            <label className="text-sm font-semibold mb-1 block">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    className="input pl-10"
                                    placeholder="student@college.edu"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="text-sm font-semibold mb-1 block">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    className="input pl-10"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-full py-3 mt-2 text-md">
                            {isLogin ? 'Login' : 'Sign Up'} <ArrowRight size={18} />
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm">
                        <span className="text-muted">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                        </span>
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-2 font-bold text-primary hover:underline"
                        >
                            {isLogin ? 'Create one' : 'Login instead'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
