const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Utility function to check password strength
export const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    
    // 0=None, 1=Weak, 2=Medium, 3=Strong
    if (strength > 3) strength = 3;
    if (password.length > 0 && password.length < 8) return 0;
    if (password.length === 0) return -1; 
    
    return strength;
};

// API functions for authentication
export const authAPI = {
    async login(email, password) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        return await response.json();
    },

    async signup(userData) {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Signup failed');
        }

        return await response.json();
    },

    async getProfile(token) {
        const response = await fetch(`${API_BASE_URL}/auth/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to get profile');
        }

        return await response.json();
    },

    async updateProfile(userData, token) {
        const response = await fetch(`${API_BASE_URL}/auth/profile`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update profile');
        }

        return await response.json();
    }
};

// Consultancy API functions
export const consultancyAPI = {
    async createSession(token) {
        const response = await fetch(`${API_BASE_URL}/consultancy/session`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create session');
        }

        return await response.json();
    },

    async getAdvice(message, sessionId, token) {
        const response = await fetch(`${API_BASE_URL}/consultancy/advice`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, sessionId }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to get advice');
        }

        return await response.json();
    },

    async getChatHistory(sessionId, token) {
        const response = await fetch(`${API_BASE_URL}/consultancy/history/${sessionId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to get chat history');
        }

        return await response.json();
    }
};