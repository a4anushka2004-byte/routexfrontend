import React, { useState } from 'react';
import { Bell, Moon, Globe, Shield, LogOut, ChevronRight, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import DashboardLayout from '../components/DashboardLayout';
import { useDriver } from '../context/DriverContext';
import { useTheme } from '../context/ThemeContext';

function Settings() {
    const { logout } = useDriver();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState({
        push: true,
        email: true,
        promo: false,
    });
    const [language, setLanguage] = useState('English (India)');

    const toggleNotification = (key, label) => {
        setNotifications(prev => {
            const newValue = !prev[key];
            toast.success(`${label} ${newValue ? 'enabled' : 'disabled'}`);
            return { ...prev, [key]: newValue };
        });
    };

    const toggleLanguage = () => {
        const newLang = language === 'English (India)' ? 'Hindi' : 'English (India)';
        setLanguage(newLang);
        toast.success(`Language changed to ${newLang}`);
    };

    const handleLogout = () => {
        logout();
        toast.info('Logged out successfully');
        navigate('/');
    };

    const handleChangePassword = () => {
        toast.info('Change password feature coming soon');
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            toast.error('Account deletion requested. Please contact support to finalize.');
        }
    };

    return (
        <DashboardLayout>
            <div className="p-4 lg:p-8 max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Manage your app preferences and account security</p>
                </header>

                <div className="space-y-6">

                    {/* Notification Settings */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-3">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                                <Bell size={18} />
                            </div>
                            <h2 className="font-bold text-slate-900 dark:text-white">Notifications</h2>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white text-sm">Push Notifications</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Receive alerts for new orders and updates</p>
                                </div>
                                <button
                                    onClick={() => toggleNotification('push', 'Push notifications')}
                                    className={`w-11 h-6 rounded-full transition-colors relative ${notifications.push ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                                >
                                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${notifications.push ? 'translate-x-5' : 'translate-x-0'}`}></span>
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white text-sm">Email Alerts</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Get payment summaries and invoice details</p>
                                </div>
                                <button
                                    onClick={() => toggleNotification('email', 'Email alerts')}
                                    className={`w-11 h-6 rounded-full transition-colors relative ${notifications.email ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                                >
                                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${notifications.email ? 'translate-x-5' : 'translate-x-0'}`}></span>
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white text-sm">Promotional Emails</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Receive offers and bonus opportunities</p>
                                </div>
                                <button
                                    onClick={() => toggleNotification('promo', 'Promotional emails')}
                                    className={`w-11 h-6 rounded-full transition-colors relative ${notifications.promo ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                                >
                                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${notifications.promo ? 'translate-x-5' : 'translate-x-0'}`}></span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* General Preferences */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-3">
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg text-purple-600 dark:text-purple-400">
                                <Globe size={18} />
                            </div>
                            <h2 className="font-bold text-slate-900 dark:text-white">General Preferences</h2>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-700">
                            <button
                                onClick={toggleLanguage}
                                className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left group"
                            >
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white text-sm">Language</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold text-blue-600 dark:text-blue-400">{language}</p>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400">
                                    <span className="text-xs">Change</span>
                                    <ChevronRight size={18} className="group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                                </div>
                            </button>
                            <button
                                onClick={toggleTheme}
                                className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left group"
                            >
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white text-sm">Appearance</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold text-blue-600 dark:text-blue-400">
                                        {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400">
                                    {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                                    <ChevronRight size={18} className="group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                <Shield size={18} />
                            </div>
                            <h2 className="font-bold text-slate-900">Security</h2>
                        </div>
                        <div className="p-4 space-y-4">
                            <button
                                onClick={handleChangePassword}
                                className="w-full py-2.5 px-4 rounded-lg border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors text-center"
                            >
                                Change Password
                            </button>
                            <button
                                onClick={() => toast.info('2FA settings coming soon')}
                                className="w-full py-2.5 px-4 rounded-lg border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors text-center"
                            >
                                Enable Two-Factor Authentication
                            </button>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="pt-6 border-t border-slate-200">
                        <button
                            onClick={handleLogout}
                            className="w-full py-3 rounded-xl bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                        >
                            <LogOut size={18} />
                            Log Out
                        </button>
                        <p className="text-center mt-4">
                            <button
                                onClick={handleDeleteAccount}
                                className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors"
                            >
                                Delete Account
                            </button>
                        </p>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}

export default Settings;