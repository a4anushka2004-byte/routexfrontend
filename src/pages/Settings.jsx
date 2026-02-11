import React, { useState } from 'react';
import { Bell, Moon, Globe, Shield, LogOut, ChevronRight } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

function Settings() {
    const [notifications, setNotifications] = useState({
        push: true,
        email: true,
        promo: false,
    });

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <DashboardLayout>
            <div className="p-4 lg:p-8 max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                    <p className="text-sm text-slate-500">Manage your app preferences and account security</p>
                </header>

                <div className="space-y-6">

                    {/* Notification Settings */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                <Bell size={18} />
                            </div>
                            <h2 className="font-bold text-slate-900">Notifications</h2>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-900 text-sm">Push Notifications</p>
                                    <p className="text-xs text-slate-500">Receive alerts for new orders and updates</p>
                                </div>
                                <button
                                    onClick={() => toggleNotification('push')}
                                    className={`w-11 h-6 rounded-full transition-colors relative ${notifications.push ? 'bg-blue-600' : 'bg-slate-200'}`}
                                >
                                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${notifications.push ? 'translate-x-5' : 'translate-x-0'}`}></span>
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-900 text-sm">Email Alerts</p>
                                    <p className="text-xs text-slate-500">Get payment summaries and invoice details</p>
                                </div>
                                <button
                                    onClick={() => toggleNotification('email')}
                                    className={`w-11 h-6 rounded-full transition-colors relative ${notifications.email ? 'bg-blue-600' : 'bg-slate-200'}`}
                                >
                                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${notifications.email ? 'translate-x-5' : 'translate-x-0'}`}></span>
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-900 text-sm">Promotional Emails</p>
                                    <p className="text-xs text-slate-500">Receive offers and bonus opportunities</p>
                                </div>
                                <button
                                    onClick={() => toggleNotification('promo')}
                                    className={`w-11 h-6 rounded-full transition-colors relative ${notifications.promo ? 'bg-blue-600' : 'bg-slate-200'}`}
                                >
                                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${notifications.promo ? 'translate-x-5' : 'translate-x-0'}`}></span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* General Preferences */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                            <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                                <Globe size={18} />
                            </div>
                            <h2 className="font-bold text-slate-900">General Preferences</h2>
                        </div>
                        <div className="divide-y divide-slate-100">
                            <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left group">
                                <div>
                                    <p className="font-medium text-slate-900 text-sm">Language</p>
                                    <p className="text-xs text-slate-500">English (India)</p>
                                </div>
                                <ChevronRight size={18} className="text-slate-400 group-hover:text-slate-600" />
                            </button>
                            <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left group">
                                <div>
                                    <p className="font-medium text-slate-900 text-sm">Appearance</p>
                                    <p className="text-xs text-slate-500">Light Mode</p>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Moon size={16} />
                                    <ChevronRight size={18} className="group-hover:text-slate-600" />
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
                            <button className="w-full py-2.5 px-4 rounded-lg border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors text-center">
                                Change Password
                            </button>
                            <button className="w-full py-2.5 px-4 rounded-lg border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors text-center">
                                Enable Two-Factor Authentication
                            </button>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="pt-6 border-t border-slate-200">
                        <button className="w-full py-3 rounded-xl bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                            <LogOut size={18} />
                            Log Out
                        </button>
                        <p className="text-center mt-4">
                            <button className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors">
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