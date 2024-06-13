import React, { useContext } from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {AuthContext} from "./AuthContext";

const ProtectedRoute = ({ role }) => {
    const { isLogged, hasRole, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isLogged()) {
        return <Navigate to="/" replace />;
    }

    if (role && !hasRole(role)) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;