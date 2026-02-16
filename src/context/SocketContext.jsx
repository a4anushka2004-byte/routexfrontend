import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { requestForToken, onMessageListener } from '../services/firebase';
import { toast } from 'sonner';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children, userId }) => {
    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Initialize Firebase
        requestForToken();
        onMessageListener()
            .then((payload) => {
                console.log('Push notification received:', payload);
                toast.info(`Notification: ${payload.notification.title}`);
            })
            .catch((err) => console.log('failed: ', err));

        const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const socketInstance = io(SOCKET_URL, {
            transports: ['websocket'],
            autoConnect: true,
        });

        socketInstance.on('connect', () => {
            console.log('Connected to socket server');
            if (userId) {
                socketInstance.emit('join_user', userId);
            }
        });

        socketInstance.on('new_order', (order) => {
            console.log('New order received:', order);
            setNotifications((prev) => [...prev, { type: 'new_order', data: order }]);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, [userId]);

    const clearNotification = (index) => {
        setNotifications((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <SocketContext.Provider value={{ socket, notifications, clearNotification }}>
            {children}
        </SocketContext.Provider>
    );
};
