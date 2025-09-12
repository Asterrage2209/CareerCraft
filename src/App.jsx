import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Consultancy from './pages/Consultancy';
import JobPostings from './pages/JobPostings';

export default function App() {
    // State for theme, routing, and authentication
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Theme switcher logic
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    
    // Simple navigation logic
    const navigateTo = (page) => {
        // Redirect to dashboard if trying to access auth pages while logged in
        if (isAuthenticated && (page === 'signin' || page === 'signup')) {
            setCurrentPage('dashboard');
        } else {
            setCurrentPage(page);
        }
        window.scrollTo(0, 0); // Scroll to top on page change
    };

    // Authentication handlers
    const handleLogin = () => setIsAuthenticated(true);
    const handleLogout = () => {
      setIsAuthenticated(false);
      navigateTo('dashboard');
    }

    // Render the current page based on state
    const renderPage = () => {
        switch (currentPage) {
            case 'signin':
                return <SignIn navigateTo={navigateTo} handleLogin={handleLogin} />;
            case 'signup':
                return <SignUp navigateTo={navigateTo} />;
            case 'consultancy':
                return <Consultancy />;
            case 'jobpostings':
                return <JobPostings />;
            case 'dashboard':
            default:
                return <Dashboard navigateTo={navigateTo} />;
        }
    };

    return (
        <div className="font-sans antialiased text-gray-900 dark:text-gray-100 transition-colors duration-500">
            <Navbar 
                navigateTo={navigateTo} 
                theme={theme} 
                toggleTheme={toggleTheme}
                isAuthenticated={isAuthenticated}
                handleLogout={handleLogout}
            />
            <main className="transition-opacity duration-500">
                {renderPage()}
            </main>
        </div>
    );
}