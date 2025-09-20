import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Briefcase, MessageSquare, LogIn, LogOut, User, Menu, X, School } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Logo = () => (
    <div className="flex items-center space-x-2">
        <Briefcase className="h-8 w-8 text-teal-600 dark:text-teal-500" />
        <span className="text-2xl font-bold text-gray-800 dark:text-white">CareerCraft</span>
    </div>
);


const NavLink = ({ to, children, onClick }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleClick = (e) => {
        if (!isAuthenticated) {
            e.preventDefault();
            navigate('/signin');
        }
        if(onClick) onClick();
    };

    return (
        <Link to={to} onClick={handleClick} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-500 transition-colors duration-300">
            {children}
        </Link>
    );
};


export default function Navbar({ theme, handleThemeSwitch }) {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth();

    const handleLogout = () => {
        logout();
        setProfileMenuOpen(false);
        setMobileMenuOpen(false);
        navigate('/');
    };
    
    const getNavLinks = () => {
        const commonLinks = [
            { href: "/consultancy", label: "Consultancy", icon: MessageSquare },
        ];
        if (isAuthenticated) {
            if (user.role === 'college_student') {
                return [...commonLinks, { href: "/jobs", label: "Job Postings", icon: Briefcase }];
            }
            if (user.role === 'school_student') {
                return [...commonLinks, { href: "/college-admissions", label: "College Admissions", icon: School }];
            }
        }
        // Not logged in
        return [
            ...commonLinks,
            { href: "/jobs", label: "Job Postings", icon: Briefcase },
            { href: "/college-admissions", label: "College Admissions", icon: School }
        ];
    };

    const navLinks = getNavLinks();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-8">
                    <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                        <Logo />
                    </Link>
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map(link => (
                            <NavLink key={link.href} to={link.href}>
                                <link.icon className="h-5 w-5" />
                                <span>{link.label}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-4">
                        <button onClick={handleThemeSwitch} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
                        </button>

                        {isAuthenticated ? (
                            <div className="relative">
                                <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                                    {user?.profilePicture ? (
                                        <img 
                                            src={user.profilePicture} 
                                            alt="Profile" 
                                            className="h-8 w-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <User className="h-5 w-5" />
                                    )}
                                </button>
                                {profileMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                                        <Link to="/edit-profile" onClick={() => setProfileMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Edit Profile</Link>
                                        <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/signin" className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-transform duration-300 hover:scale-105">
                                <LogIn className="h-5 w-5" />
                                <span>Sign In</span>
                            </Link>
                        )}
                    </div>
                    
                    <div className="md:hidden">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 py-4 px-6 space-y-4">
                     {navLinks.map(link => (
                        <NavLink key={link.href} to={link.href} onClick={() => setMobileMenuOpen(false)}>
                            <link.icon className="h-5 w-5" />
                            <span>{link.label}</span>
                        </NavLink>
                    ))}
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <div className="flex items-center justify-between">
                         <span className="text-sm">Switch Theme</span>
                         <button onClick={handleThemeSwitch} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
                        </button>
                    </div>
                     {isAuthenticated ? (
                        <div className='space-y-2'>
                            <div className="flex items-center space-x-3 py-2">
                                {user?.profilePicture ? (
                                    <img 
                                        src={user.profilePicture} 
                                        alt="Profile" 
                                        className="h-8 w-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <User className="h-5 w-5" />
                                )}
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{user?.name}</span>
                            </div>
                            <Link to="/edit-profile" onClick={() => setMobileMenuOpen(false)} className="w-full text-left flex items-center space-x-2 py-2">
                                <User className="h-5 w-5" /><span>Edit Profile</span>
                            </Link>
                            <button onClick={handleLogout} className="w-full text-left flex items-center space-x-2 text-red-500 py-2">
                                <LogOut className="h-5 w-5" /><span>Log Out</span>
                            </button>
                        </div>
                     ) : (
                         <Link to="/signin" onClick={() => setMobileMenuOpen(false)} className="flex w-full justify-center items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-transform duration-300 hover:scale-105">
                            <LogIn className="h-5 w-5" />
                            <span>Sign In</span>
                        </Link>
                     )}
                </div>
            )}
        </nav>
    );
}