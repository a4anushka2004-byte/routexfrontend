import React from 'react';
import { Mail, Phone, MapPin, Truck, CheckCircle, AlertCircle, Calendar, Star, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { useDriver } from '../context/DriverContext';

function Profile() {
    const { user } = useDriver();
    const navigate = useNavigate();

    return (
        <DashboardLayout>
            <div className="p-4 lg:p-8">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Driver Profile</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Manage your account and preferences</p>
                    </div>
                </header>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Column: ID Card & Contact */}
                    <div className="w-full lg:w-1/3 space-y-6">

                        {/* ID Card */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-blue-500"></div>
                            <div className="relative z-10 mt-12 mb-4">
                                <div className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 shadow-md mx-auto overflow-hidden bg-white dark:bg-slate-800">
                                    <img src={`https://ui-avatars.com/api/?name=${user?.name || 'P'}&background=random`} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user?.name || 'Driver Name'}</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{user?.role === 'driver' ? 'Logistics Driver' : user?.role || 'Driver'}</p>

                            <div className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-700 dark:text-blue-400 text-xs font-semibold mt-2">
                                ID: {user?._id ? `#RX-${user._id.slice(-4).toUpperCase()}` : 'Loading...'}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6 border-t border-slate-100 dark:border-slate-700 pt-6">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-lg">
                                        4.8 <Star size={16} fill="currentColor" />
                                    </div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase">Rating</p>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-lg text-slate-900 dark:text-white">0</div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase">Trips</p>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/edit-profile')}
                                className="w-full mt-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                Edit Profile
                            </button>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-lg text-slate-600 dark:text-slate-300">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Email Address</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">{user?.email || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-lg text-slate-600 dark:text-slate-300">
                                        <Phone size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Phone Number</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">{user?.phone || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-lg text-slate-600 dark:text-slate-300">
                                        <MapPin size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Place</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">{user?.address || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Vehicle & Docs */}
                    <div className="flex-1 space-y-6">

                        {/* Vehicle Details */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-slate-900 dark:text-white">Vehicle Details</h3>
                                <span className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold px-2.5 py-1 rounded-full border border-green-100 dark:border-green-900/30">Active</span>
                            </div>
                            <div className="flex items-center gap-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700">
                                <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500">
                                    <Truck size={32} />
                                </div>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-2 flex-1">
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Vehicle Type</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.vehicleType || 'Not set'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">License Plate</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white font-mono">{user?.licensePlate || 'Not set'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Capacity</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.capacity ? `${user.capacity} kg` : 'Not set'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Documents */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-6">Documents & Compliance</h3>
                            <div className="grid gap-4">

                                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2.5 rounded-lg text-blue-600 dark:text-blue-400">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">Driving License</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Expires: Dec 2028</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-600 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">
                                        <CheckCircle size={14} />
                                        <span className="text-xs font-bold">Verified</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2.5 rounded-lg text-blue-600 dark:text-blue-400">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">Vehicle Registration (RC)</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Expires: Mar 2030</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-600 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">
                                        <CheckCircle size={14} />
                                        <span className="text-xs font-bold">Verified</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-amber-100 dark:bg-amber-900/30 p-2.5 rounded-lg text-amber-600 dark:text-amber-400">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">Vehicle Insurance</p>
                                            <p className="text-xs text-amber-700 dark:text-amber-500 font-semibold">Expires in 15 days</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-amber-600 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-amber-100 dark:border-amber-900/30 shadow-sm">
                                        <AlertCircle size={14} />
                                        <span className="text-xs font-bold">Review</span>
                                    </div>
                                </div>

                            </div>
                            <button className="w-full mt-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors">
                                Upload New Document
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Profile;