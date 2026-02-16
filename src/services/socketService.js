import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class SocketService {
    constructor() {
        this.socket = null;
    }

    connect(token) {
        this.socket = io(SOCKET_URL, {
            auth: { token },
            transports: ['websocket']
        });

        this.socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        this.socket.on('connect_error', (err) => {
            console.error('Socket connection error:', err);
        });
    }

    joinZone(zoneId) {
        if (this.socket) {
            this.socket.emit('join_zone', zoneId);
        }
    }

    updateLocation(data) {
        if (this.socket) {
            this.socket.emit('update_location', data);
        }
    }

    onLocationUpdate(callback) {
        if (this.socket) {
            this.socket.on('location_updated', callback);
        }
    }

    onOrderStatusUpdate(callback) {
        if (this.socket) {
            this.socket.on('order_status_updated', callback);
        }
    }

    onGlobalLocationUpdate(callback) {
        if (this.socket) {
            this.socket.on('global_location_update', callback);
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

const socketService = new SocketService();
export default socketService;
