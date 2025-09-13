import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

export default function SignIn({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const demoEmail = 'demo@user.com';
    const demoPassword = 'password123';

    const handleSignIn = (e) => {
        e.preventDefault();
        setError(''); 

        if (email === demoEmail && password === demoPassword) {
            setIsLoggedIn(true);
            navigate('/');
        } else {
            setError('Invalid credentials. Please use the demo credentials.');
        }
    };

    return (
        <div className="flex items-center justify-center py-12 px-4">
            <AnimatedSection className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Sign in to your account</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Or{' '}
                        <Link to="/signup" className="font-medium text-teal-600 hover:text-teal-500">
                            start your 14-day free trial
                        </Link>
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl space-y-4">
                    <div className="bg-teal-50 dark:bg-teal-900/30 border-l-4 border-teal-500 text-teal-800 dark:text-teal-200 p-4 rounded-r-lg" role="alert">
                        <p className="font-bold">Demo Credentials</p>
                        <p>Email: <strong>{demoEmail}</strong></p>
                        <p>Password: <strong>{demoPassword}</strong></p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSignIn}>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password-address" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}

                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </AnimatedSection>
        </div>
    );
}