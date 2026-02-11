import React from 'react';
import { Mail, Phone, MapPin, Truck, CheckCircle, AlertCircle, Calendar, Star, FileText } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useDriver } from '../context/DriverContext';

function Profile() {
    const { user } = useDriver();

    return (
        <DashboardLayout>
            <div className="p-4 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Partner Profile</h1>
                    <p className="text-sm text-slate-500">Manage your account and preferences</p>
                </header>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Column: ID Card & Contact */}
                    <div className="w-full lg:w-1/3 space-y-6">

                        {/* ID Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-blue-500"></div>
                            <div className="relative z-10 mt-12 mb-4">
                                <div className="w-24 h-24 rounded-full border-4 border-white shadow-md mx-auto overflow-hidden bg-white">
                                    <img src={`https://ui-avatars.com/api/?name=${user?.name || 'P'}&background=random`} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-slate-900">{user?.name || 'Partner Name'}</h2>
                            <p className="text-sm text-slate-500 mb-2">{user?.role === 'driver' ? 'Logistics Partner' : user?.role || 'Partner'}</p>
                            <div className="inline-flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full text-blue-700 text-xs font-semibold">
                                ID: {user?._id ? `#RX-${user._id.slice(-4).toUpperCase()}` : 'Loading...'}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6 border-t border-slate-100 pt-6">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-lg">
                                        4.8 <Star size={16} fill="currentColor" />
                                    </div>
                                    <p className="text-xs text-slate-400 font-medium uppercase">Rating</p>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-lg text-slate-900">0</div>
                                    <p className="text-xs text-slate-400 font-medium uppercase">Trips</p>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 hover:text-slate-900 transition-colors">
                                Edit Profile
                            </button>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-4">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-semibold">Email Address</p>
                                        <p className="text-sm font-medium text-slate-900">{user?.email || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-semibold">Phone Number</p>
                                        <p className="text-sm font-medium text-slate-900">+91 98765 43210</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-semibold">Address</p>
                                        <p className="text-sm font-medium text-slate-900">Noida, Uttar Pradesh</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Vehicle & Docs */}
                    <div className="flex-1 space-y-6">

                        {/* Vehicle Details */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-slate-900">Vehicle Details</h3>
                                <span className="bg-green-50 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full border border-green-100">Active</span>
                            </div>
                            <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border border-slate-200 text-slate-400">
                                    <Truck size={32} />
                                </div>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-2 flex-1">
                                    <div>
                                        <p className="text-xs text-slate-500">Vehicle Type</p>
                                        <p className="text-sm font-bold text-slate-900">Tata Ace Gold</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">License Plate</p>
                                        <p className="text-sm font-bold text-slate-900 font-mono">UP 16 AB 1234</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Fuel Type</p>
                                        <p className="text-sm font-bold text-slate-900">CNG</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Capacity</p>
                                        <p className="text-sm font-bold text-slate-900">750 kg</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Documents */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-6">Documents & Compliance</h3>
                            <div className="grid gap-4">

                                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">Driving License</p>
                                            <p className="text-xs text-slate-500">Expires: Dec 2028</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-600 bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm">
                                        <CheckCircle size={14} />
                                        <span className="text-xs font-bold">Verified</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">Vehicle Registration (RC)</p>
                                            <p className="text-xs text-slate-500">Expires: Mar 2030</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-600 bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm">
                                        <CheckCircle size={14} />
                                        <span className="text-xs font-bold">Verified</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-100 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-amber-100 p-2.5 rounded-lg text-amber-600">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">Vehicle Insurance</p>
                                            <p className="text-xs text-amber-700 font-semibold">Expires in 15 days</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-amber-600 bg-white px-3 py-1.5 rounded-lg border border-amber-100 shadow-sm">
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