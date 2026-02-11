import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin, Navigation, MessageSquare, Box, ShoppingBag, AlertCircle, Home, Headphones, ArrowRight, User, Clock, Wallet } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useDriver } from '../context/DriverContext';

function DropOff() {
    const navigate = useNavigate();
    const { completeOrder, activeOrder } = useDriver();

    React.useEffect(() => {
        if (!activeOrder) {
            navigate('/dashboard');
        }
    }, [activeOrder, navigate]);

    const handleComplete = async () => {
        await completeOrder();
        navigate('/dashboard');
    };

    if (!activeOrder) return <DashboardLayout><div>Loading...</div></DashboardLayout>;

    return (
        <DashboardLayout>
            <div className="p-4 lg:p-8 max-w-7xl mx-auto font-sans text-slate-900">

                {/* Success Banner */}
                <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-8 flex items-start gap-4">
                    <div className="bg-green-500 rounded-full p-1 text-white shrink-0 mt-0.5">
                        <CheckCircle size={20} />
                    </div>
                    <div>
                        <h3 className="text-green-800 font-bold text-lg">Package Successfully Picked Up</h3>
                        <p className="text-green-600 text-sm">Order #{activeOrder.orderId || activeOrder._id} is now in your possession. Transit to the drop-off location has begun.</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Column: Main Content */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">STEP 2: DELIVERY</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-8">Proceed to Drop-off</h1>

                        {/* Drop-off Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-8">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                                    <MapPin size={14} />
                                    DROP-OFF ADDRESS
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">{activeOrder.dropoffAddress?.name || 'Drop-off'}</h2>
                                <p className="text-slate-500 text-lg mb-6">
                                    {activeOrder.dropoffAddress?.address || 'Address not available'}
                                </p>
                                <div className="flex gap-3">
                                    <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors">
                                        <Navigation size={18} />
                                        Open Navigation
                                    </button>
                                    <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors">
                                        <MessageSquare size={18} />
                                        Message Customer
                                    </button>
                                </div>
                            </div>

                            {/* Package Details */}
                            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center min-w-[280px]">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-4">PACKAGE DETAILS</span>
                                <div className="bg-slate-200 w-16 h-16 rounded-xl flex items-center justify-center text-slate-500 mb-2">
                                    <Box size={32} />
                                </div>
                                <div className="text-xl font-bold text-slate-900 mb-1">LARGE BOX</div>
                                <div className="text-sm font-bold text-blue-600 mb-4">FRAGILE</div>
                                <p className="text-[10px] text-slate-400 text-center uppercase tracking-wide">Handle with care: Electronics inside</p>
                            </div>
                        </div>

                        {/* Info Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                    <User size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase">CUSTOMER</p>
                                    <p className="text-sm font-bold text-slate-900 leading-tight">{activeOrder.dropoffAddress?.contactName || 'Customer'}</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase">TYPE</p>
                                    <p className="text-sm font-bold text-slate-900 leading-tight">{activeOrder.type}</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                                    <Wallet size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase">PAYOUT</p>
                                    <p className="text-sm font-bold text-slate-900 leading-tight">₹{activeOrder.payout}</p>
                                </div>
                            </div>
                        </div>

                        {/* Primary Action */}
                        <button
                            onClick={handleComplete}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl font-bold text-xl shadow-xl shadow-green-200 transition-all active:scale-[0.99] flex items-center justify-center gap-3"
                        >
                            COMPLETE DELIVERY
                            <CheckCircle size={24} />
                        </button>
                        <p className="text-center text-slate-400 text-sm mt-4">Please only click after handing over the package to the recipient.</p>
                    </div>

                    {/* Right Column: Route Status */}
                    <div className="w-full lg:w-96 shrink-0">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-slate-900 text-lg">Route Status</h3>
                                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded">DELIVERY IN PROGRESS</span>
                            </div>

                            {/* Map Visualization */}
                            <div className="relative py-8 flex flex-col items-center">
                                {/* Line */}
                                <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-100 -translate-y-1/2 rounded-full"></div>
                                <div className="absolute top-1/2 left-0 w-2/3 h-1.5 bg-blue-600 -translate-y-1/2 rounded-full"></div>

                                {/* Points */}
                                <div className="absolute top-1/2 left-[15%] -translate-y-1/2 flex flex-col items-center gap-2 opacity-50">
                                    <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-white z-10 border-4 border-white">
                                        <Home size={14} />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase mt-8 absolute top-2 whitespace-nowrap">Warehouse</span>
                                </div>

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white z-10 border-4 border-white shadow-lg scale-110">
                                        {/* Bike Icon simulated */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18.5" cy="17.5" r="3.5" /><circle cx="5.5" cy="17.5" r="3.5" /><circle cx="15" cy="5" r="1" /><path d="M12 17.5V14l-3-3 4-3 2 3h2" /></svg>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-900 uppercase mt-10 absolute top-2 bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">YOU</span>
                                </div>

                                <div className="absolute top-1/2 right-[15%] -translate-y-1/2 flex flex-col items-center gap-2">
                                    <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white z-10 border-4 border-white shadow-sm">
                                        <MapPin size={14} fill="white" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-900 uppercase mt-8 absolute top-2 whitespace-nowrap">Drop-off Point</span>
                                </div>
                            </div>

                            <div className="mt-12 space-y-4 border-t border-slate-100 pt-6">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Est. Delivery</span>
                                    <span className="font-bold text-slate-900">18 mins</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Distance Left</span>
                                    <span className="font-bold text-slate-900">5.2 miles</span>
                                </div>
                            </div>

                            <div className="mt-6 bg-slate-50 rounded-xl p-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 font-bold text-xs shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">LIVE TRAFFIC</p>
                                    <p className="text-sm font-bold text-green-600 leading-tight">Light - Optimized Route</p>
                                </div>
                            </div>

                        </div>

                        {/* Help Card */}
                        <div className="bg-slate-900 rounded-2xl p-6 mt-4 text-white flex items-center justify-between shadow-lg">
                            <div>
                                <h4 className="font-bold text-sm">Need Help?</h4>
                                <p className="text-slate-400 text-xs mt-0.5">RouteX Support is active</p>
                            </div>
                            <button className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white hover:bg-slate-700 transition-colors">
                                <Headphones size={20} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}

export default DropOff;