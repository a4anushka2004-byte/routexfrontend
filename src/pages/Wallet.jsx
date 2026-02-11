import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon, Calendar, Download } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useDriver } from '../context/DriverContext';

function Wallet() {
    const { walletBalance } = useDriver();

    const transactions = [
        { id: 1, type: 'credit', title: 'Delivery - Amazon Hub 2', date: 'Today, 10:45 AM', amount: '45.00', status: 'Completed' },
        { id: 2, type: 'credit', title: 'Delivery - Flipkart Warehouse', date: 'Yesterday, 4:20 PM', amount: '60.00', status: 'Completed' },
        { id: 3, type: 'debit', title: 'Bank Transfer to HDFC ****8821', date: 'Jan 24, 2024', amount: '2500.00', status: 'Processing' },
        { id: 4, type: 'credit', title: 'Delivery - Myntra Hub', date: 'Jan 23, 2024', amount: '52.00', status: 'Completed' },
        { id: 5, type: 'credit', title: 'Weekly Bonus', date: 'Jan 22, 2024', amount: '500.00', status: 'Completed' },
    ];

    return (
        <DashboardLayout>
            <div className="p-4 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">My Wallet</h1>
                    <p className="text-sm text-slate-500">Manage earnings and payouts</p>
                </header>

                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                    {/* Balance Card */}
                    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg shadow-slate-200 lg:col-span-1 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
                        <div className="relative z-10">
                            <p className="text-slate-400 text-sm font-medium mb-1">Available Balance</p>
                            <h2 className="text-4xl font-bold mb-6">₹{walletBalance !== null ? walletBalance.toFixed(2) : '0.00'}</h2>

                            <div className="flex gap-3">
                                <button className="flex-1 bg-white text-slate-900 py-2.5 rounded-lg font-semibold text-sm hover:bg-slate-100 transition-colors">
                                    Withdraw
                                </button>
                                <button className="flex-1 bg-slate-800 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-slate-700 transition-colors">
                                    Add Funds
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="lg:col-span-2 grid sm:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                            <div className="bg-green-50 w-10 h-10 rounded-lg flex items-center justify-center text-green-600 mb-4">
                                <ArrowUpRight size={20} />
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Today's Earnings</p>
                                <p className="text-2xl font-bold text-slate-900">₹{walletBalance > 1250 ? (walletBalance - 1250).toFixed(2) : walletBalance.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                            <div className="bg-amber-50 w-10 h-10 rounded-lg flex items-center justify-center text-amber-600 mb-4">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Withdrawable</p>
                                <p className="text-2xl font-bold text-slate-900">₹{walletBalance.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                            <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                                <WalletIcon size={20} />
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Trips</p>
                                <p className="text-2xl font-bold text-slate-900">0</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-bold text-slate-900">Recent Transactions</h3>
                        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                            Download Report
                            <Download size={16} />
                        </button>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'}`}>
                                        {tx.type === 'credit' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 text-sm">{tx.title}</p>
                                        <p className="text-xs text-slate-500">{tx.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold text-sm ${tx.type === 'credit' ? 'text-green-600' : 'text-slate-900'}`}>
                                        {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                                    </p>
                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${tx.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                        {tx.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-slate-50 rounded-b-2xl border-t border-slate-200 text-center">
                        <button className="text-sm font-semibold text-slate-600 hover:text-slate-900">View All Transactions</button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Wallet;