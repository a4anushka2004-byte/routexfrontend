import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
    Users,
    Package,
    TrendingUp,
    CreditCard,
    PlusCircle,
    BarChart3
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts';

import { useSocket } from '../context/SocketContext';
import { toast } from 'sonner';

const AdminDashboard = () => {
    const { notifications } = useSocket();
    const [stats, setStats] = useState({
        users: 124,
        orders: 1854,
        transactions: 0,
        growth: '+12%'
    });
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Mocking chart data for now
        setChartData([
            { name: 'Jan', orders: 400, revenue: 2400 },
            { name: 'Feb', orders: 300, revenue: 1398 },
            { name: 'Mar', orders: 200, revenue: 9800 },
            { name: 'Apr', orders: 278, revenue: 3908 },
            { name: 'May', orders: 189, revenue: 4800 },
            { name: 'Jun', orders: 239, revenue: 3800 },
        ]);
    }, []);

    // Real-time notification for Admin
    useEffect(() => {
        const latestStatus = notifications.find(n => n.type === 'order_status_updated');
        if (latestStatus) {
            toast.info(`Order #${latestStatus.data.orderId.slice(-4)}: ${latestStatus.data.status}`);
            // Logic to update stats locally could go here
            setStats(prev => ({ ...prev, orders: prev.orders + 1 }));
        }
    }, [notifications]);

    return (
        <div className="p-6 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
            <h1 className="text-2xl font-bold mb-8 text-black dark:text-white">Admin Control Panel</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard icon={<Users className="w-6 h-6" />} label="Total Drivers" value="124" trend="+3.2%" />
                <StatCard icon={<Package className="w-6 h-6" />} label="Total Orders" value="1,854" trend="+12.4%" />
                <StatCard icon={<TrendingUp className="w-6 h-6" />} label="Revenue" value="₹45.2K" trend="+8.1%" />
                <StatCard icon={<CreditCard className="w-6 h-6" />} label="Payouts" value="₹12.8K" trend="-2.4%" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                    <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-500" />
                        Order Volume Analytics
                    </h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3F3F46" />
                                <XAxis dataKey="name" stroke="#71717A" />
                                <YAxis stroke="#71717A" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181B', border: 'none', borderRadius: '8px' }}
                                    itemStyle={{ color: '#F4F4F5' }}
                                />
                                <Bar dataKey="orders" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                    <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                        Revenue Trends
                    </h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3F3F46" />
                                <XAxis dataKey="name" stroke="#71717A" />
                                <YAxis stroke="#71717A" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181B', border: 'none', borderRadius: '8px' }}
                                    itemStyle={{ color: '#F4F4F5' }}
                                />
                                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, trend }) => (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-blue-600 dark:text-blue-400">
                {icon}
            </div>
            <span className={`text-sm font-medium ${trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {trend}
            </span>
        </div>
        <div className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">{label}</div>
        <div className="text-2xl font-bold mt-1 text-black dark:text-white">{value}</div>
    </div>
);

export default AdminDashboard;
