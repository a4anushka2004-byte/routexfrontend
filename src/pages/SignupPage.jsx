import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDriver } from '../context/DriverContext';
import { toast } from 'sonner';

function SignupPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register } = useDriver();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!fullName || !email || !password || !role) {
            toast.error('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            await register({ name: fullName, email, password, role });
            toast.success('Account created successfully!');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-sans text-slate-900">
            {/* Left Side - Visual Column */}
            <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative overflow-hidden flex-col justify-center px-16 text-white">
                {/* Abstract Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                </div>

                <div className="relative z-10 space-y-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 border border-white/20 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Trusted by 10k+ companies
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-5xl font-extrabold leading-tight">
                            Streamline your <br />
                            global supply chain.
                        </h1>
                        <p className="text-xl text-blue-100 max-w-md leading-relaxed">
                            Access real-time tracking, intelligent routing, and a global network of verified carriers in one unified platform.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 pt-8">
                        <div>
                            <div className="text-4xl font-bold">99.9%</div>
                            <div className="text-sm text-blue-100 font-medium uppercase tracking-wider mt-1">Uptime SLA</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold">24/7</div>
                            <div className="text-sm text-blue-100 font-medium uppercase tracking-wider mt-1">Expert Support</div>
                        </div>
                    </div>
                </div>

                {/* Truck Graphic Placeholder */}
                <div className="absolute -bottom-10 -right-20 opacity-20 transform -rotate-12 scale-150">
                    <svg className="w-96 h-96 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M1 3h16v13H1V3zm18 10h4v2h-4v-2zm0-3h4v2h-4v-2zM3 18a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4z" />
                    </svg>
                </div>
            </div>

            {/* Right Side - Form Column */}
            <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-16">
                <div className="max-w-md w-full mx-auto flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-16">
                        <div className="flex items-center gap-2">
                            <div className="bg-blue-600 p-1.5 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900">RouteX</span>
                        </div>
                        <p className="text-sm text-slate-500">
                            Already a member? <Link to="/" className="text-blue-600 font-semibold hover:underline">Log in</Link>
                        </p>
                    </div>

                    {/* Form Title */}
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Create an account</h2>
                        <p className="text-slate-500">Join the global network of modern logistics professionals.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john@company.com"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                />
                                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Partner Type</label>
                            <div className="relative">
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none"
                                >
                                    <option value="">Select your role</option>
                                    <option value="driver">Logistics Driver</option>
                                    <option value="fleet_manager">Fleet Manager</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <svg className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>

                        <div className="text-center text-xs text-slate-400 mt-4 leading-relaxed">
                            By signing up, you agree to RouteX's <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
                        </div>

                        {/* Divider */}
                        <div className="relative flex items-center py-4">
                            <div className="flex-grow border-t border-slate-100"></div>
                            <span className="flex-shrink mx-4 text-xs font-semibold text-slate-300 uppercase tracking-widest">or continue with</span>
                            <div className="flex-grow border-t border-slate-100"></div>
                        </div>

                        {/* Social Buttons */}
                        <button type="button" className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-semibold text-sm text-slate-700">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </button>
                    </form>

                    {/* Footer Nav */}
                    <div className="mt-auto pt-10 flex justify-center gap-6 text-xs font-semibold text-slate-400">
                        <a href="#" className="hover:text-slate-600 transition-colors">Help Center</a>
                        <a href="#" className="hover:text-slate-600 transition-colors">Contact Sales</a>
                        <a href="#" className="hover:text-slate-600 transition-colors">About Us</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
