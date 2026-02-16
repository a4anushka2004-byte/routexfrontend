import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon, Calendar, Download } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useDriver } from '../context/DriverContext';

function Wallet() {
    const { walletBalance } = useDriver();

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchWalletData = async () => {
            try {
                const data = await api.getWallet();
                setTransactions(data.transactions.map(t => ({
                    id: t._id,
                    type: t.type,
                    title: t.description || (t.type === 'credit' ? 'Order Payment' : 'Withdrawal'),
                    date: new Date(t.createdAt).toLocaleString(),
                    amount: t.amount.toFixed(2),
                    status: t.status.charAt(0).toUpperCase() + t.status.slice(1)
                })));
            } catch (err) {
                console.error('Failed to fetch wallet data', err);
            }
        };
        fetchWalletData();
    }, []);

    return (
        <DashboardLayout>
            <div className="p-4 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Wallet</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Manage earnings and payouts</p>
                </header>

                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                    {/* Balance Card */}
                    <div className="bg-slate-900 dark:bg-slate-950 text-white p-6 rounded-2xl shadow-lg shadow-slate-200 dark:shadow-none lg:col-span-1 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
                        <div className="relative z-10">
                            <p className="text-slate-400 text-sm font-medium mb-1">Available Balance</p>
                            <h2 className="text-4xl font-bold mb-6">₹{walletBalance !== null ? walletBalance.toFixed(2) : '0.00'}</h2>

                            <div className="flex gap-3">
                                <button className="flex-1 bg-white text-slate-900 py-2.5 rounded-lg font-semibold text-sm hover:bg-slate-100 transition-colors">
                                    Withdraw
                                </button>
                                <button className="flex-1 bg-slate-800 dark:bg-slate-900 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-slate-700 dark:hover:bg-slate-800 transition-colors">
                                    Add Funds
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="lg:col-span-2 grid sm:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                            <div className="bg-green-50 dark:bg-green-900/20 w-10 h-10 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
                                <ArrowUpRight size={20} />
                            </div>
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Today's Earnings</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">₹{walletBalance > 1250 ? (walletBalance - 1250).toFixed(2) : walletBalance.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                            <div className="bg-amber-50 dark:bg-amber-900/20 w-10 h-10 rounded-lg flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Withdrawable</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">₹{walletBalance.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                            <div className="bg-blue-50 dark:bg-blue-900/20 w-10 h-10 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                                <WalletIcon size={20} />
                            </div>
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Trips</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">0</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
                        <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1">
                            Download Report
                            <Download size={16} />
                        </button>
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-700">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                                        {tx.type === 'credit' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white text-sm">{tx.title}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{tx.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold text-sm ${tx.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}>
                                        {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                                    </p>
                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${tx.status === 'Completed' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'}`}>
                                        {tx.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-b-2xl border-t border-slate-200 dark:border-slate-700 text-center">
                        <button className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">View All Transactions</button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Wallet;