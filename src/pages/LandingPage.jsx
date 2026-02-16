import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

import { useDriver } from '../context/DriverContext';

function LandingPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const { login, logout } = useDriver();

    const handleLogin = async () => {
        if (!role) {
            toast.error('Please select a partner type');
            return;
        }

        try {
            const data = await login(email, password);
            if (data.role !== role) {
                logout();
                toast.error(`Access denied: You are registered as ${data.role}, not ${role}`);
                return;
            }

            toast.success('Login successful! Redirecting...');

            if (data.role === 'admin') navigate('/admin-dashboard');
            else if (data.role === 'fleet_manager') navigate('/fleet-dashboard');
            else if (data.role === 'partner') navigate('/dashboard');
            else navigate('/');
        } catch (err) {
            toast.error(err.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">RouteX</span>
                </div>

                <nav className="flex items-center gap-8">
                    <Link to="/contact" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Contact</Link>
                    <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Help</a>
                    <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm shadow-blue-600/20">
                        Sign Up
                    </Link>
                </nav>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* Left Column: Hero Text */}
                <div className="space-y-8">
                    <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                        RouteX: <span className="text-blue-600">Simplified</span> <br />
                        Last-Mile Logistics
                    </h1>

                    <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                        Empowering partners with real-time tracking, optimized routing, and seamless communication to scale your delivery operations.
                    </p>

                    <div className="flex items-center gap-4 pt-2">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                                    <svg className="w-full h-full text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm font-medium text-slate-600">
                            Trusted by 5,000+ logistics partners globally
                        </p>
                    </div>

                    {/* Decorative Truck/Map Graphic Placeholder */}
                    <div className="relative mt-12 h-64 w-full bg-blue-50/50 rounded-2xl border border-blue-100 overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                        <svg className="w-32 h-32 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M1 3h16v13H1V3zm18 10h4v2h-4v-2zm0-3h4v2h-4v-2zM3 18a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4z" />
                        </svg>
                        <div className="absolute bottom-6 left-6 flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                            <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                            <div className="w-2 h-2 rounded-full bg-blue-200"></div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Login Card */}
                <div className="w-full max-w-md mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-slate-900">Partner Login</h2>
                            <p className="text-sm text-slate-500 mt-1">Please enter your credentials to access the portal</p>
                        </div>

                        <form className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                        placeholder="name@company.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-slate-700">Password</label>
                                    {/* <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">Forgot Password?</a> */}
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-security-disc"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Select Partner Type</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                        </svg>
                                    </div>
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className={`block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none bg-white ${!role ? 'text-slate-500' : 'text-slate-900'}`}
                                    >
                                        <option value="" disabled>Choose role</option>
                                        <option value="partner">Logistics Driver</option>
                                        <option value="fleet_manager">Fleet Manager</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleLogin}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-md shadow-blue-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
                            >
                                Log In
                                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-slate-500">
                                Don't have a partner account? <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700">Apply Now</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-200 mt-auto w-full">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                    <p>© {new Date().getFullYear()} RouteX Logistics Solutions. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-slate-600 transition-colors">Status</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;