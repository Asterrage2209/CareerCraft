import React, { useState, useEffect, useRef } from 'react';
import { Logo, MoonIcon, SunIcon, UserIcon, ChevronDownIcon } from './Icons';

export default function Navbar({ navigateTo, theme, toggleTheme, isAuthenticated, handleLogout }) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const NavLink = ({ page, children }) => (
        <button
            onClick={() => navigateTo(page)}
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-300"
        >
            {children}
        </button>
    );

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md z-50">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-8">
                    <button onClick={() => navigateTo('dashboard')} className="flex items-center text-indigo-600 dark:text-indigo-400">
                        <Logo />
                    </button>
                    <div className="hidden md:flex items-center space-x-6">
                        <NavLink page="consultancy">Consultancy</NavLink>
                        <NavLink page="jobpostings">Job Postings</NavLink>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                    </button>
                    {isAuthenticated ? (
                        <div className="relative" ref={profileMenuRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                <UserIcon />
                                <ChevronDownIcon className={`transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Edit Profile</a>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsProfileOpen(false);
                                        }}
                                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => navigateTo('signin')}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-indigo-700 transition-transform duration-300 ease-in-out transform hover:scale-105"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
