import React from 'react';
import AnimatedSection from '../components/AnimatedSection';

export default function SignIn({ navigateTo, handleLogin }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
        navigateTo('dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 pt-20">
            <div className="w-full max-w-md">
                <AnimatedSection className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl space-y-6">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">Sign In</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
                            <input id="email" name="email" type="email" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <input id="password" name="password" type="password" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                        </div>
                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Sign In</button>
                    </form>
                    <div className="mt-4 p-4 bg-indigo-50 dark:bg-gray-700 rounded-lg text-sm text-center">
                        <p className="font-semibold text-indigo-800 dark:text-indigo-300">Demo Credentials</p>
                        <p className="text-gray-600 dark:text-gray-400">Email: <span className="font-mono">demo@careercraft.io</span></p>
                        <p className="text-gray-600 dark:text-gray-400">Password: <span className="font-mono">password123</span></p>
                    </div>
                    <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        Not a member?{' '}
                        <button onClick={() => navigateTo('signup')} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Sign up now</button>
                    </p>
                </AnimatedSection>
            </div>
        </div>
    );
};
