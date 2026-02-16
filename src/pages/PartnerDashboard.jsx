import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Wallet, User, Settings, Bell, Star, CheckCircle } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useDriver } from '../context/DriverContext';
import { useSocket } from '../context/SocketContext';
import { useGPSTracking } from '../hooks/useGPSTracking';
import OrderAssignmentModal from '../components/driver/OrderAssignmentModal';
import { api } from '../services/api';
import { toast } from 'sonner';

function PartnerDashboard() {
    const navigate = useNavigate();
    const { user, isOnline, activeOrder, walletBalance, completeOrder, acceptOrder } = useDriver();
    const { notifications, clearNotification } = useSocket();
    const [orders, setOrders] = useState([]);

    // Start GPS tracking if there's an active order
    useGPSTracking(!!activeOrder);

    useEffect(() => {
        if (isOnline && !activeOrder) {
            fetchOrders();
        }
    }, [isOnline, activeOrder]);

    const fetchOrders = async () => {
        try {
            const data = await api.getAvailableOrders();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders', error);
        }
    };

    const handleAcceptOrder = async (orderId) => {
        try {
            await acceptOrder(orderId);
            toast.success('Order accepted! Navigate to pickup.');
            // Clear the notification if it originated from one
            const index = notifications.findIndex(n => n.data._id === orderId);
            if (index !== -1) clearNotification(index);
        } catch (error) {
            toast.error('Failed to accept order');
        }
    };

    const handleRejectOrder = (index) => {
        clearNotification(index);
        toast.info('Order declined');
    };

    const latestOrderNotif = notifications.find(n => n.type === 'new_order');
    const orderNotifIndex = notifications.findIndex(n => n.type === 'new_order');

    return (
        <DashboardLayout>
            <div className="p-8">
                {/* Real-time Order Modal */}
                {latestOrderNotif && (
                    <OrderAssignmentModal
                        order={latestOrderNotif.data}
                        onAccept={handleAcceptOrder}
                        onReject={() => handleRejectOrder(orderNotifIndex)}
                    />
                )}

                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-800">
                        {user ? `Good morning, ${user.name.split(' ')[0]}` : 'Good morning'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm">
                            <Bell size={20} />
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-slate-900">{user?.name || 'Partner'}</p>
                                <p className="text-xs text-slate-500 tracking-wide">ID: {user?._id ? `#RX-${user._id.slice(-4).toUpperCase()}` : 'Loading...'}</p>
                            </div>
                            <img src={`https://ui-avatars.com/api/?name=${user?.name || 'P'}&background=random`} alt="Avatar" className="w-10 h-10 rounded-full border border-slate-200 object-cover" />
                        </div>
                    </div>
                </header>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-slate-500 text-sm font-medium">Available Orders</span>
                            <div className="bg-blue-50 p-1.5 rounded text-blue-600">
                                <LayoutDashboard size={16} />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-slate-900">{isOnline ? (activeOrder ? 0 : orders.length) : 0}</span>
                            {isOnline && <span className="text-sm font-semibold text-green-600">+5% ↗</span>}
                        </div>
                    </div>

                    <div
                        onClick={() => navigate('/wallet')}
                        className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm cursor-pointer hover:border-blue-200 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-slate-500 text-sm font-medium">Daily Earnings</span>
                            <div className="bg-green-50 p-1.5 rounded text-green-600">
                                <Wallet size={16} />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-slate-900">₹{walletBalance}</span>
                            <span className="text-sm font-semibold text-green-600">+12% ↗</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-slate-500 text-sm font-medium">Partner Rating</span>
                            <div className="bg-amber-50 p-1.5 rounded text-amber-500">
                                <Star size={16} fill="currentColor" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-slate-900">4.8</span>
                            <span className="text-sm font-semibold text-green-600">+0.1% ↗</span>
                        </div>
                    </div>
                </div>

                {/* Dynamic Content Based on Status */}
                <section>

                    {!isOnline ? (
                        // Offline State
                        <div className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-12 text-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                <LayoutDashboard size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">You are currently offline</h3>
                            <p className="text-slate-500 mb-6 max-w-sm mx-auto">Start your shift to begin receiving delivery opportunities and earning money.</p>
                            <button
                                onClick={() => navigate('/delivery-request')}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-sm transition-colors"
                            >
                                Start Shift
                            </button>
                        </div>
                    ) : activeOrder ? (
                        // Active Order State
                        <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm ring-4 ring-blue-50/50">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block">IN PROGRESS</span>
                                    <h3 className="text-xl font-bold text-slate-900 font-sans">Order #{activeOrder.orderId}</h3>
                                    <p className="text-sm text-slate-500 mt-1">{activeOrder.company} • {activeOrder.type}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-slate-900">₹{activeOrder.payout}</p>
                                    <p className="text-xs text-slate-400 uppercase font-semibold">EST. EARNING</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 mb-6">
                                <div className="flex-1 bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">PICKUP</p>
                                    <p className="font-semibold text-slate-800 text-sm">{activeOrder.pickupAddress?.name || 'Pickup Location'}</p>
                                </div>
                                <div className="text-slate-300">➜</div>
                                <div className="flex-1 bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">DROPOFF</p>
                                    <p className="font-semibold text-slate-800 text-sm">{activeOrder.dropoffAddress?.name || 'Dropoff Location'}</p>
                                </div>
                            </div>

                            <button
                                onClick={completeOrder}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                            >
                                <CheckCircle size={20} />
                                Complete Delivery
                            </button>
                        </div>
                    ) : (
                        // Available Orders List
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-slate-800">Nearby Opportunities</h3>
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <span>Real-time updates active</span>
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {orders.map((order, idx) => (
                                    <div key={idx} className="bg-white border border-slate-100 rounded-xl p-5 hover:border-blue-200 hover:shadow-md transition-all group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex gap-3">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs ${order.bg || 'bg-blue-600'} overflow-hidden`}>
                                                    {order.company ? order.company[0] : 'O'}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900 text-sm">{order.company}</h4>
                                                    <p className="text-xs text-slate-500 mt-0.5">Pick-up: {order.pickupAddress?.address || 'Start Location'}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-slate-900">₹{order.payout}</p>
                                                <p className="text-xs text-slate-400 uppercase font-semibold">PAYOUT</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 mb-5">
                                            <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                                <svg className="w-4 h-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                                {order.distance || '2.5 km'}
                                            </div>
                                            <div className="w-px h-3 bg-slate-200"></div>
                                            <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                                <svg className="w-4 h-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                                {order.duration || '15 mins'}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleAcceptOrder(order._id)}
                                            className="w-full py-2.5 rounded-lg bg-slate-50 text-slate-900 font-semibold text-sm hover:bg-slate-900 hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:bg-slate-900 group-hover:text-white"
                                        >
                                            Accept Order
                                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </section>
            </div>
        </DashboardLayout>
    );
}

export default PartnerDashboard;