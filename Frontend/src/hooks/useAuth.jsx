import React, { createContext, useState, useContext, useEffect } from 'react';

// TODO: Replace with a more secure way to handle user data
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('careerCraftUser');
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            return null;
        }
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('careerCraftUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('careerCraftUser');
        }
    }, [user]);
    
    // TODO: Implement actual login logic with backend 
    const login = (userData) => {
        setUser(userData);
    };

    // TODO: Implement actual logout logic 
    const logout = () => {
        setUser(null);
    };

    // TODO: Implement actual profile update logic with backend 
    const updateUser = (updatedData) => {
        setUser(prevUser => ({ ...prevUser, ...updatedData }));
    };

    const value = {
        user,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
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
