import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';

import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Consultancy from './pages/Consultancy';
import JobPostings from './pages/JobPostings';
import CollegeAdmissions from './pages/CollegeAdmissions';
import EditProfile from './pages/EditProfile';
import JobPostPage from './pages/JobPostPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const handleThemeSwitch = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <AuthProvider>
            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 font-sans">
                <Navbar theme={theme} handleThemeSwitch={handleThemeSwitch} />
                <main className="pt-20">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        
                        <Route path="/consultancy" element={<ProtectedRoute><Consultancy /></ProtectedRoute>} />
                        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
                        
                        <Route path="/jobs" element={<ProtectedRoute requiredRole="college_student"><JobPostings /></ProtectedRoute>} />
                        <Route path="/jobs/:jobId" element={<ProtectedRoute requiredRole="college_student"><JobPostPage /></ProtectedRoute>} />
                        <Route path="/college-admissions" element={<ProtectedRoute requiredRole="school_student"><CollegeAdmissions /></ProtectedRoute>} />

                    </Routes>
                </main>
            </div>
        </AuthProvider>
    );
}