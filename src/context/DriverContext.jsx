import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../services/api';

const DriverContext = createContext();

export const useDriver = () => useContext(DriverContext);

import { SocketProvider } from './SocketContext';

export const DriverProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isOnline, setIsOnline] = useState(false);
    const [activeOrder, setActiveOrder] = useState(null);
    const [walletBalance, setWalletBalance] = useState(0);

    // ... existing useEffect and functions ...
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchProfile();
        }
    }, []);

    const fetchProfile = async () => {
        try {
            const userData = await api.getProfile();
            const walletInfo = await api.getWallet();
            setUser({ ...userData, role: localStorage.getItem('role'), _id: userData._id });
            localStorage.setItem('userId', userData._id);
            setIsOnline(userData.isOnline);
            setWalletBalance(walletInfo.wallet.balance);
        } catch (error) {
            console.error('Failed to fetch profile', error);
            logout();
        }
    };

    const register = async (userData) => {
        try {
            const data = await api.register(userData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('userId', data._id);
            if (data.zone) localStorage.setItem('zoneId', data.zone);
            setUser(data);
            setIsOnline(data.isOnline);
            setWalletBalance(data.walletBalance || 0);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const data = await api.login(email, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('userId', data._id);
            if (data.zone) localStorage.setItem('zoneId', data.zone);
            setUser(data);
            setIsOnline(data.isOnline);
            setWalletBalance(data.walletBalance || 0);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('zoneId');
        localStorage.removeItem('userId');
        setUser(null);
        setIsOnline(false);
        setWalletBalance(0);
    };

    const toggleOnline = async () => {
        try {
            const newState = !isOnline;
            await api.updateStatus(newState);
            setIsOnline(newState);
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    const startShift = () => {
        toggleOnline(); // Re-use toggle or force true if API supports it
    };

    const goOffline = async () => {
        try {
            await api.updateStatus(false);
            setIsOnline(false);
            setActiveOrder(null);
        } catch (error) {
            console.error('Failed to go offline', error);
        }
    };

    const acceptOrder = async (orderId) => {
        try {
            const order = await api.acceptOrder(orderId);
            setActiveOrder(order);
            if (!isOnline) setIsOnline(true);
        } catch (error) {
            console.error('Failed to accept order', error);
        }
    };

    const completeOrder = async () => {
        if (activeOrder) {
            try {
                const res = await api.completeOrder(activeOrder._id);
                setWalletBalance(res.walletBalance);
                setActiveOrder(null);
            } catch (error) {
                console.error('Failed to complete order', error);
            }
        }
    };

    return (
        <SocketProvider userId={user?._id}>
            <DriverContext.Provider value={{
                user,
                setUser,
                login,
                register,
                logout,
                isOnline,
                activeOrder,
                walletBalance,
                toggleOnline,
                startShift,
                goOffline,
                acceptOrder,
                completeOrder
            }}>
                {children}
            </DriverContext.Provider>
        </SocketProvider>
    );
};