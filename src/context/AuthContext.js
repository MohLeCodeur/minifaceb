import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, registerUser, logoutUser, checkAuthStatus } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Vérifier si l'utilisateur est déjà connecté via une session PHP
        const verifyAuth = async () => {
            try {
                const response = await checkAuthStatus();
                if (response.data.success) {
                    setUser(response.data.user);
                }
            } catch (error) {
                console.error("Non authentifié", error);
            } finally {
                setLoading(false);
            }
        };
        verifyAuth();
    }, []);

    const login = async (credentials) => {
        const response = await loginUser(credentials);
        if (response.data.success) {
            setUser(response.data.user);
        }
        return response;
    };

    const register = async (userData) => {
        const response = await registerUser(userData);
        if (response.data.success) {
            setUser(response.data.user);
        }
        return response;
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);