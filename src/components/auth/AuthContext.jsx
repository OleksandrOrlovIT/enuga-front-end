import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (token && storedUser) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp > currentTime) {
                    setUser({ token, ...storedUser });

                    const timeUntilExpiration = (decodedToken.exp - currentTime) * 1000;

                    setTimeout(() => {
                        logout();
                    }, timeUntilExpiration);
                } else {
                    logout();
                }
            } catch (error) {
                console.error('Invalid token', error);
                logout();
            }
        } else {
            setLoading(false);
        }
    }, []);

    const login = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser({ token, ...user });

        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        const timeUntilExpiration = (decodedToken.exp - currentTime) * 1000;

        setTimeout(() => {
            logout();
        }, timeUntilExpiration);
    };

    const isLogged = () => {
        return user !== null;
    };

    const hasRole = (requiredRole) => {
        return user && user.roles.includes(requiredRole);
    };

    const notRole = (requiredRole) => {
        return user && !user.roles.includes(requiredRole);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, hasRole, isLogged, notRole, loading }}>
            {children}
        </AuthContext.Provider>
    );
};