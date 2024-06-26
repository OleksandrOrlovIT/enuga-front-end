import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ role, notPassedRole }) => {
    const { isLogged, hasRole, loading, notRole } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isLogged()) {
        return <Navigate to="/" replace />;
    }

    if (role && !hasRole(role)) {
        return <Navigate to="/home" replace />;
    }

    if (role && !notRole(notPassedRole)) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;