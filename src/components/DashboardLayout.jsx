import React from 'react';
import { LayoutDashboard, Wallet, User, Settings, LogOut, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDriver } from '../context/DriverContext';

function DashboardLayout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { isOnline, goOffline } = useDriver();

    const handleStartShift = () => {
        navigate('/delivery-request');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 z-10 hidden lg:flex">
                <div className="p-6 flex items-center gap-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                        </svg>
                    </div>
                    <div className="leading-tight">
                        <h1 className="text-lg font-bold text-slate-900 tracking-tight">RouteX</h1>
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">Partner Portal</p>
                    </div>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${isActive('/dashboard') ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </button>
                    <button
                        onClick={() => navigate('/wallet')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${isActive('/wallet') ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                    >
                        <Wallet size={20} />
                        Wallet
                    </button>
                    <button
                        onClick={() => navigate('/profile')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${isActive('/profile') ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                    >
                        <User size={20} />
                        Profile
                    </button>
                    <button
                        onClick={() => navigate('/settings')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${isActive('/settings') ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                    >
                        <Settings size={20} />
                        Settings
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</span>
                            <div className="flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOnline ? 'bg-green-400' : 'bg-slate-400'}`}></span>
                                    <span className={`relative inline-flex rounded-full h-2 w-2 ${isOnline ? 'bg-green-500' : 'bg-slate-500'}`}></span>
                                </span>
                                <span className={`text-xs font-bold ${isOnline ? 'text-green-700' : 'text-slate-500'}`}>{isOnline ? 'Online' : 'Offline'}</span>
                            </div>
                        </div>

                        {isOnline ? (
                            <button onClick={goOffline} className="text-xs font-semibold text-red-600 hover:text-red-700 w-full text-right mb-4 block">Go Offline</button>
                        ) : (
                            <div className="mb-4 h-4"></div> // Spacer
                        )}

                        <button
                            onClick={handleStartShift}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                        >
                            <LogOut size={16} /> {/* Using LogOut icon as a placeholder for Start Shift icon if custom svg is too long */}
                            Start Shift
                        </button>
                    </div>
                </div>
            </aside>

            {/* Content Wrapper */}
            <div className="flex-1 lg:ml-64 w-full">
                <div className="px-4 pt-4 lg:px-8 lg:pt-8 mb-[-1rem]">
                    {location.pathname === '/dashboard' ? (
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-bold text-sm"
                        >
                            <ArrowLeft size={18} />
                            Back to Login
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-bold text-sm"
                        >
                            <ArrowLeft size={18} />
                            Back
                        </button>
                    )}
                </div>
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;