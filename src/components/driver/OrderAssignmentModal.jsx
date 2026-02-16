import React from 'react';
import { X, MapPin, Navigation, Clock, CreditCard } from 'lucide-react';

const OrderAssignmentModal = ({ order, onAccept, onReject }) => {
    if (!order) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-blue-600 p-6 text-white relative">
                    <button
                        onClick={onReject}
                        className="absolute right-4 top-4 text-blue-100 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/30 rounded-lg">
                            <Navigation size={24} className="text-white" />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest text-blue-100">New Assignment</span>
                    </div>
                    <h2 className="text-3xl font-black italic">NEW ORDER!</h2>
                    <p className="text-blue-100 mt-1 font-medium">#{order.orderId}</p>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="space-y-6">
                        {/* Payout */}
                        <div className="bg-green-50 rounded-xl p-4 flex justify-between items-center border border-green-100">
                            <div>
                                <p className="text-xs text-green-600 font-bold uppercase tracking-wider">Estimated Payout</p>
                                <p className="text-3xl font-black text-green-700">₹{order.payout}</p>
                            </div>
                            <CreditCard className="text-green-600" size={32} />
                        </div>

                        {/* Route Info */}
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center pt-1">
                                    <div className="w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-50"></div>
                                    <div className="w-0.5 h-10 bg-slate-100"></div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Pickup</p>
                                    <p className="text-slate-800 font-bold">{order.pickupAddress?.name}</p>
                                    <p className="text-sm text-slate-500 line-clamp-1">{order.pickupAddress?.address}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <MapPin className="text-red-500" size={18} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Dropoff</p>
                                    <p className="text-slate-800 font-bold">{order.dropoffAddress?.name}</p>
                                    <p className="text-sm text-slate-500 line-clamp-1">{order.dropoffAddress?.address}</p>
                                </div>
                            </div>
                        </div>

                        {/* Distance/Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3">
                                <Navigation className="text-slate-400" size={18} />
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Distance</p>
                                    <p className="text-sm font-bold text-slate-700">{order.distance || '---'}</p>
                                </div>
                            </div>
                            <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3">
                                <Clock className="text-slate-400" size={18} />
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Estimated</p>
                                    <p className="text-sm font-bold text-slate-700">15 mins</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <button
                            onClick={onReject}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-xl transition-colors"
                        >
                            Decline
                        </button>
                        <button
                            onClick={() => onAccept(order._id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-95"
                        >
                            Accept Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderAssignmentModal;
