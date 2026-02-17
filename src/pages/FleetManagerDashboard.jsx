import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import socketService from '../services/socketService';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Map as MapIcon, Navigation, UserCheck, AlertCircle } from 'lucide-react';

const FleetManagerDashboard = () => {
    const [drivers, setDrivers] = useState([]);
    const [orders, setOrders] = useState([]);
    const zoneId = localStorage.getItem('zoneId');

    useEffect(() => {
        socketService.connect(localStorage.getItem('token'));
        socketService.joinZone(zoneId);

        socketService.onLocationUpdate((data) => {
            setDrivers(prev => {
                const idx = prev.findIndex(p => p.id === data.userId);
                if (idx > -1) {
                    const next = [...prev];
                    next[idx] = { ...next[idx], position: [data.lat, data.lng] };
                    return next;
                }
                return [...prev, { id: data.userId, position: [data.lat, data.lng] }];
            });
        });

        socketService.onOrderStatusUpdate((data) => {
            setOrders(prev => {
                const idx = prev.findIndex(o => o._id === data.orderId);
                if (idx > -1) {
                    const next = [...prev];
                    next[idx] = { ...next[idx], status: data.status };
                    return next;
                }
                return prev;
            });
        });

        const fetchData = async () => {
            try {
                const orderData = await api.getOrders();
                setOrders(orderData);
            } catch (err) {
                console.error('Failed to fetch orders:', err);
            }
        };

        fetchData();

        return () => socketService.disconnect();
    }, [zoneId]);

    return (
        <div className="p-6 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-black dark:text-white flex items-center gap-2">
                    <Navigation className="w-6 h-6 text-blue-500" />
                    Fleet Monitoring - Zone Alpha
                </h1>
                <div className="flex gap-4">
                    <div className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full text-sm font-medium flex items-center gap-2">
                        <UserCheck className="w-4 h-4" /> 12 Online
                    </div>
                    <div className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-full text-sm font-medium flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> 3 Delayed
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 relative h-[600px] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl">
                    <MapContainer center={[28.6139, 77.2090]} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {drivers.map(driver => (
                            <Marker key={driver.id} position={driver.position}>
                                <Popup>Driver {driver.id} is live</Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <MapIcon className="w-5 h-5" /> Active Shipments
                        </h2>
                        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
                            {orders.map(order => (
                                <div key={order._id} className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-blue-500">#{order.orderId}</span>
                                        <span className="text-[10px] px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 rounded-full uppercase tracking-wider">
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="text-sm font-semibold truncate capitalize">{order.company}</div>
                                    <div className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                                        <Navigation className="w-3 h-3" /> {order.distance} • {order.duration}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FleetManagerDashboard;
