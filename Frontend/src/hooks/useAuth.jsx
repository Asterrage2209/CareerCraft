import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../utils/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('careerCraftUser');
        const storedToken = localStorage.getItem('careerCraftToken');
        try {
            return storedUser && storedToken ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            return null;
        }
    });
    const [token, setToken] = useState(() => {
        return localStorage.getItem('careerCraftToken');
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && token) {
            localStorage.setItem('careerCraftUser', JSON.stringify(user));
            localStorage.setItem('careerCraftToken', token);
        } else {
            localStorage.removeItem('careerCraftUser');
            localStorage.removeItem('careerCraftToken');
        }
    }, [user, token]);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await authAPI.login(email, password);
            const { token: newToken, user: userData } = response;
            
            setToken(newToken);
            setUser(userData);
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const signup = async (userData) => {
        setLoading(true);
        try {
            const response = await authAPI.signup(userData);
            const { token: newToken, user: newUser } = response;
            
            setToken(newToken);
            setUser(newUser);
            return { success: true };
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    const updateUser = (updatedData) => {
        setUser(prevUser => ({ ...prevUser, ...updatedData }));
    };

    const value = {
        user,
        token,
        login,
        signup,
        logout,
        updateUser,
        loading,
        isAuthenticated: !!user && !!token,
        userRole: user?.role
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
