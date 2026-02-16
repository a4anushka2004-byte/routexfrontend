import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
    const userRole = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/" />;
    }

    if (roles && !roles.includes(userRole)) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default ProtectedRoute;
