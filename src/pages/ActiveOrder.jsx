import { useNavigate } from 'react-router-dom';
import { useDriver } from '../context/DriverContext';
import { useEffect } from 'react';
import { CheckCircle, MapPin, Navigation, Phone, Box, ShoppingBag, AlertCircle, ArrowRight, Home, Headphones } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

function ActiveOrder() {
    const navigate = useNavigate();
    const { activeOrder } = useDriver();

    useEffect(() => {
        if (!activeOrder) {
            navigate('/dashboard');
        }
    }, [activeOrder, navigate]);

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
                        <h3 className="text-green-800 font-bold text-lg">Order Successfully Accepted</h3>
                        <p className="text-green-600 text-sm">You are now assigned to Order #{activeOrder.orderId}. Please proceed to the warehouse.</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Column: Main Content */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">STEP 1: COLLECTION</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-8">Proceed to Warehouse</h1>

                        {/* Warehouse Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-8">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                                    <MapPin size={14} />
                                    PICKUP ADDRESS
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">{activeOrder.pickupAddress?.name || 'Warehouse'}</h2>
                                <p className="text-slate-500 text-lg mb-6">
                                    {activeOrder.pickupAddress?.address || 'Address not available'}
                                </p>
                                <div className="flex gap-3">
                                    <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors">
                                        <Navigation size={18} />
                                        Get Directions
                                    </button>
                                    <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors">
                                        <Phone size={18} />
                                        Contact Warehouse
                                    </button>
                                </div>
                            </div>

                            {/* Verification Code */}
                            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center min-w-[280px]">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">PICKUP VERIFICATION CODE</span>
                                <div className="text-4xl font-mono font-bold text-blue-600 tracking-widest mb-3">RX - {activeOrder._id?.substr(-4).toUpperCase() || 'CODE'}</div>
                                <p className="text-xs text-slate-400 text-center max-w-[200px]">Share this code with the warehouse manager to verify pickup</p>
                                <div className="flex gap-1.5 mt-4">
                                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                    <span className="w-2 h-2 rounded-full bg-slate-200"></span>
                                    <span className="w-2 h-2 rounded-full bg-slate-200"></span>
                                </div>
                            </div>
                        </div>

                        {/* Shipment Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                    <Box size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase">CLIENT</p>
                                    <p className="text-sm font-bold text-slate-900 leading-tight">{activeOrder.company}</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                                    <ShoppingBag size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase">WEIGHT</p>
                                    <p className="text-sm font-bold text-slate-900 leading-tight">{activeOrder.weight || '2.5 kg'}</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                                    <AlertCircle size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase">TYPE</p>
                                    <p className="text-sm font-bold text-slate-900 leading-tight">{activeOrder.type || 'Standard'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Primary Action */}
                        <button
                            onClick={() => navigate('/drop-off')}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-bold text-xl shadow-xl shadow-blue-200 transition-all active:scale-[0.99] flex items-center justify-center gap-3"
                        >
                            MARK AS PICKED UP
                            <ArrowRight size={24} />
                        </button>
                        <p className="text-center text-slate-400 text-sm mt-4">Once confirmed, the customer will be notified and delivery route will begin.</p>
                    </div>

                    {/* Right Column: Route Status */}
                    <div className="w-full lg:w-96 shrink-0">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-slate-900 text-lg">Route Status</h3>
                                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded">EN ROUTE TO PICKUP</span>
                            </div>

                            {/* Map Visualization */}
                            <div className="relative py-8 flex flex-col items-center">
                                {/* Line */}
                                <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-100 -translate-y-1/2 rounded-full"></div>
                                <div className="absolute top-1/2 left-0 w-1/3 h-1.5 bg-blue-600 -translate-y-1/2 rounded-full"></div>

                                {/* Points */}
                                <div className="absolute top-1/2 left-[15%] -translate-y-1/2 flex flex-col items-center gap-2">
                                    <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white z-10 border-4 border-white shadow-sm">
                                        <MapPin size={14} fill="white" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase mt-8 absolute top-2 whitespace-nowrap">Your Location</span>
                                </div>

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white z-10 border-4 border-white shadow-lg scale-110">
                                        <Home size={16} fill="white" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-900 uppercase mt-10 absolute top-2">Warehouse</span>
                                </div>

                                <div className="absolute top-1/2 right-[15%] -translate-y-1/2 flex flex-col items-center gap-2 opacity-50">
                                    <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-white z-10 border-4 border-white">
                                        <MapPin size={14} />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase mt-8 absolute top-2 whitespace-nowrap">Drop-off</span>
                                </div>
                            </div>

                            <div className="mt-12 space-y-4 border-t border-slate-100 pt-6">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Est. Arrival</span>
                                    <span className="font-bold text-slate-900">12 mins</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Distance</span>
                                    <span className="font-bold text-slate-900">3.8 miles</span>
                                </div>
                            </div>

                            <div className="mt-6 bg-slate-50 rounded-xl p-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-400 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0">
                                    <Box size={16} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">DROP-OFF POINT</p>
                                    <p className="text-sm font-bold text-slate-900 leading-tight">The Heights Residential, NY</p>
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

export default ActiveOrder;