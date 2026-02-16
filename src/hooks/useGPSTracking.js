import { useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

export const useGPSTracking = (isActive) => {
    const { socket } = useSocket();

    useEffect(() => {
        let watchId;

        if (isActive && socket && navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const zoneId = localStorage.getItem('zoneId');
                    const userId = localStorage.getItem('userId'); // Added for convenience

                    socket.emit('update_location', {
                        userId,
                        lat: latitude,
                        lng: longitude,
                        zoneId
                    });
                },
                (error) => console.error('GPS Error:', error),
                {
                    enableHighAccuracy: true,
                    maximumAge: 5000,
                    timeout: 20000
                }
            );
        }

        return () => {
            if (watchId) navigator.geolocation.clearWatch(watchId);
        };
    }, [isActive, socket]);
};
