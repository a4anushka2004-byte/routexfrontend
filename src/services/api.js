const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'http://localhost:5000/api';

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
        try {
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
        } catch (error) {
            if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                throw new Error('Connect error: Backend server is not reachable. Please ensure it is running.');
            }
            throw error;
        }
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

    updateProfile: async (profileData) => {
        const response = await fetch(`${API_URL}/driver/profile`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(profileData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update profile');
        }
        return response.json();
    },

    getWallet: async () => {
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

    getOrders: async () => {
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
    },

    getTransactions: async () => {
        const response = await fetch(`${API_URL}/transactions/my`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch transactions');
        return response.json();
    }
};
