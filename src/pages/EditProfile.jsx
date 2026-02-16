import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Truck, CreditCard, Shield, FileText, Upload, Save, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { useDriver } from '../context/DriverContext';
import { api } from '../services/api';
import { toast } from 'sonner';

function EditProfile() {
    const { user, setUser } = useDriver();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        vehicleType: '',
        licensePlate: '',
        capacity: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                vehicleType: user.vehicleType || '',
                licensePlate: user.licensePlate || '',
                capacity: user.capacity || '',
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const updatedUser = await api.updateProfile(formData);
            if (setUser) {
                setUser(prev => ({ ...prev, ...updatedUser }));
            }
            toast.success('Profile updated successfully');
            navigate('/profile');
        } catch (error) {
            toast.error(error.message || 'Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto p-4 lg:p-8">
                <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Edit Profile</h1>
                        <p className="text-slate-500 dark:text-slate-400">Keep your driver information and vehicle compliance up to date.</p>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 dark:shadow-none transition-all disabled:opacity-50"
                    >
                        <Save size={18} />
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2 mb-6 text-blue-600 dark:text-blue-400">
                            <User size={20} />
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Personal Information</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all dark:text-white outline-none"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 dark:text-slate-400 cursor-not-allowed outline-none"
                                    placeholder="email@example.com"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all dark:text-white outline-none"
                                    placeholder="+1 (555) 000-0000"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Vehicle Details */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2 mb-6 text-blue-600 dark:text-blue-400">
                            <Truck size={20} />
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Vehicle Details</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Vehicle Type</label>
                                <select
                                    name="vehicleType"
                                    value={formData.vehicleType}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all dark:text-white outline-none appearance-none"
                                    required
                                >
                                    <option value="">Select vehicle</option>
                                    <option value="Mini Truck">Mini Truck (Small)</option>
                                    <option value="Heavy Truck (18-Wheeler)">Heavy Truck (18-Wheeler)</option>
                                    <option value="Delivery Van">Delivery Van</option>
                                    <option value="Tata Ace">Tata Ace</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">License Plate</label>
                                <input
                                    type="text"
                                    name="licensePlate"
                                    value={formData.licensePlate}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all dark:text-white outline-none"
                                    placeholder="RTX-9988"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Capacity (kg)</label>
                                <input
                                    type="number"
                                    name="capacity"
                                    value={formData.capacity}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all dark:text-white outline-none"
                                    placeholder="12500"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Documents */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                <Shield size={20} />
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Documents & Compliance</h2>
                            </div>
                            <button type="button" className="text-blue-600 dark:text-blue-400 text-sm font-bold flex items-center gap-1.5 hover:underline">
                                <Upload size={16} />
                                Upload New Document
                            </button>
                        </div>

                        <div className="space-y-4">
                            {[
                                { title: 'Driving License', sub: 'Expires: Oct 24, 2025', status: 'verified' },
                                { title: 'Vehicle Registration', sub: 'Updated 2 days ago', status: 'review' },
                                { title: 'Vehicle Insurance', sub: 'Policy #998-RTX-22', status: 'verified' }
                            ].map((doc, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{doc.title}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{doc.sub}</p>
                                        </div>
                                    </div>
                                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${doc.status === 'verified'
                                        ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                                        : 'text-amber-600 bg-amber-50 dark:bg-amber-900/20'
                                        }`}>
                                        {doc.status === 'verified' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                                        {doc.status === 'verified' ? 'Verified' : 'In Review'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                        <button
                            type="button"
                            onClick={() => navigate('/profile')}
                            className="w-full sm:w-auto px-8 py-3 text-slate-600 dark:text-slate-400 font-bold hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            Cancel Changes
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full sm:w-80 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 dark:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <Save size={18} />
                            {isLoading ? 'Saving Changes...' : 'Save All Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}

export default EditProfile;
