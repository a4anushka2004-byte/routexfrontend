const API_URL = 'https://routex-backend-9xhe.onrender.com/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
};

export const api = {
    // Auth
    login: async (email, password) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }
        return response.json();
    },

    register: async (userData) => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Registration failed');
        }
        return response.json();
    },

    // Driver
    getProfile: async () => {
        const response = await fetch(`${API_URL}/driver/profile`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch profile');
        return response.json();
    },

    updateStatus: async (isOnline) => {
        const response = await fetch(`${API_URL}/driver/status`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ isOnline })
        });
        if (!response.ok) throw new Error('Failed to update status');
        return response.json();
    },

    getWalletBalance: async () => {
        const response = await fetch(`${API_URL}/driver/wallet`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch wallet balance');
        return response.json();
    },
    
    // Orders
    getAvailableOrders: async () => {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch orders');
        return response.json();
    },

    acceptOrder: async (orderId) => {
        const response = await fetch(`${API_URL}/orders/${orderId}/accept`, {
            method: 'PUT',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to accept order');
        return response.json();
    },

    completeOrder: async (orderId) => {
        const response = await fetch(`${API_URL}/orders/${orderId}/complete`, {
            method: 'PUT',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to complete order');
        return response.json();
    }
};
