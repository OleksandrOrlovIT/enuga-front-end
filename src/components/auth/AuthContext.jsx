import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        if (token && user) {
            setUser({ token, ...user });
        }
        setLoading(false);
    }, []);

    const login = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser({ token, ...user });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const isLogged = () => {
        return user !== null;
    }

    const hasRole = (requiredRole) => {
        return user && user.roles.includes(requiredRole);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, hasRole, isLogged, loading }}>
            {children}
        </AuthContext.Provider>
    );
};