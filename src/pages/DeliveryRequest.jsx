import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Copy, MapPin, Navigation, Clock, Box, Shield, Monitor } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useDriver } from '../context/DriverContext';

function DeliveryRequest() {
    const navigate = useNavigate();
    const location = useLocation();
    const { acceptOrder } = useDriver();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        if (location.state?.order) {
            setOrder(location.state.order);
        } else {
            // Fallback or redirect if no order passed
            navigate('/dashboard');
        }
    }, [location, navigate]);

    const handleAccept = async () => {
        if (!order) return;
        try {
            await acceptOrder(order._id);
            navigate('/active-order');
        } catch (error) {
            console.error("Failed to accept", error);
        }
    };

    if (!order) return <DashboardLayout><div>Loading...</div></DashboardLayout>;

    return (
        <DashboardLayout>
            <div className="p-4 lg:p-8 max-w-6xl mx-auto font-sans text-slate-900">

                {/* Breadcrumbs */}
                <div className="text-sm text-slate-500 mb-2 font-medium">
                    <span className="text-green-500 cursor-pointer hover:underline">Orders</span> / Order #RX-987654321
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Delivery Request</h1>
                        <p className="text-green-500 font-semibold text-lg mt-1">ID: {order.orderId}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-sm border border-green-200 shadow-sm">
                            Payout: ₹{order.payout}
                        </div>
                        <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-full font-semibold text-sm transition-colors flex items-center gap-2">
                            <Copy size={16} />
                            Copy Details
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Shipment Card */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-6">
                            <div className="w-20 h-20 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md">
                                <span className="font-bold text-xs tracking-wider">{order.company?.[0] || 'C'}</span>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-xl font-bold text-slate-900">{order.company}</h2>
                                <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 text-sm mt-1 mb-3">
                                    <Monitor size={16} />
                                    <span>{order.type || 'Standard'} • Priority Shipping</span>
                                </div>
                                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                    <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600">{order.weight || '2.5 kg'}</span>
                                    <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1">
                                        <Shield size={12} /> Fragile
                                    </span>
                                    <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1">
                                        <Box size={12} /> Small Box
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Logistics Section Header */}
                        <h3 className="text-xl font-bold text-slate-900 pt-2">Logistics</h3>

                        <div className="grid md:grid-cols-2 gap-6">

                            {/* Pickup Card */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border-l-4 border-l-green-500 border-y border-r border-slate-200 relative overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="absolute top-4 right-4 text-slate-300 group-hover:text-green-500 transition-colors">
                                    <Copy size={20} />
                                </div>
                                <div className="text-xs font-bold text-green-500 tracking-wider uppercase mb-2">PICKUP ADDRESS</div>
                                <h4 className="text-lg font-bold text-slate-900 mb-1">{order.pickupAddress?.name || 'Warehouse'}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                                    {order.pickupAddress?.address}
                                </p>
                                <div className="border-t border-slate-100 pt-4">
                                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">Contact: {order.pickupAddress?.contactName || 'Staff'}</div>
                                    <div className="text-sm font-medium text-slate-500">{order.pickupAddress?.contactPhone || '+1 (555) 012-3456'}</div>
                                </div>
                            </div>

                            {/* Drop-off Card */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border-l-4 border-l-orange-400 border-y border-r border-slate-200 relative overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="absolute top-4 right-4 text-slate-300 group-hover:text-orange-400 transition-colors">
                                    <Copy size={20} />
                                </div>
                                <div className="text-xs font-bold text-orange-400 tracking-wider uppercase mb-2">DROP-OFF ADDRESS</div>
                                <h4 className="text-lg font-bold text-slate-900 mb-1">{order.dropoffAddress?.name || 'Customer'}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                                    {order.dropoffAddress?.address}
                                </p>
                                <div className="border-t border-slate-100 pt-4">
                                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">Contact: {order.dropoffAddress?.contactName || 'Customer'}</div>
                                    <div className="text-sm font-medium text-slate-500">{order.dropoffAddress?.contactPhone || '+1 (555) 098-7654'}</div>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Right Column: Route Map */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 h-full flex flex-col">
                            <h3 className="text-lg font-bold text-slate-900 mb-6">High-Clarity Route</h3>

                            {/* Visual Route Simulation */}
                            <div className="flex-1 bg-slate-50 rounded-2xl relative min-h-[300px] flex items-center justify-center overflow-hidden">
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

                                {/* Route Line */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-2 bg-green-500 rounded-full"></div>

                                {/* Origin Point */}
                                <div className="absolute top-[calc(50%+6rem)] left-1/2 -translate-x-1/2 flex flex-col items-center">
                                    <div className="w-12 h-12 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white z-10">
                                        <MapPin size={24} fill="currentColor" />
                                    </div>
                                    <div className="mt-2 text-[10px] font-bold text-slate-900 bg-white px-2 py-1 rounded shadow-sm">ORIGIN</div>
                                </div>

                                {/* Destination Point */}
                                <div className="absolute top-[calc(50%-6rem)] left-1/2 -translate-x-1/2 flex flex-col items-center">
                                    <div className="w-14 h-14 bg-orange-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white z-10 mb-2">
                                        <MapPin size={28} fill="currentColor" />
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-900 bg-white px-2 py-1 rounded shadow-sm">DESTINATION</div>
                                </div>

                                {/* Stats Floating Card */}
                                <div className="absolute bottom-4 right-4 bg-white p-3 rounded-xl shadow-lg border border-slate-100 flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                                        <Navigation size={14} className="text-green-500" />
                                        12.4 miles
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                                        <Clock size={14} className="text-green-500" />
                                        28 mins est.
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-6 space-y-3">
                                <button
                                    onClick={handleAccept}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-full text-lg shadow-lg shadow-green-200 transition-all active:scale-[0.98]"
                                >
                                    ACCEPT ORDER
                                </button>
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold py-4 rounded-full text-lg border border-slate-200 transition-colors"
                                >
                                    REJECT
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}

export default DeliveryRequest;