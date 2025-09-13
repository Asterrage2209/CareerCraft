import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Consultancy from './pages/Consultancy';
import JobPostings from './pages/JobPostings';

export default function App() {
    // Default theme is 'light'
    const [theme, setTheme] = useState('light');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <Router>
            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 font-sans">
                <Navbar theme={theme} handleThemeSwitch={handleThemeSwitch} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <main className="pt-20">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/consultancy" element={<Consultancy isLoggedIn={isLoggedIn} />} />
                        <Route path="/jobs" element={<JobPostings isLoggedIn={isLoggedIn} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}