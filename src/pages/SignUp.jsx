import React from 'react';
import AnimatedSection from '../components/AnimatedSection';

export default function SignUp({ navigateTo }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Signup successful! Please sign in.");
        navigateTo('signin');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 pt-20">
            <div className="w-full max-w-md">
                <AnimatedSection className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl space-y-6">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">Create an Account</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input id="name" name="name" type="text" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"/>
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
                            <input id="email" name="email" type="email" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"/>
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <input id="password" name="password" type="password" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"/>
                        </div>
                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Sign Up</button>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <button onClick={() => navigateTo('signin')} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Sign in</button>
                    </p>
                </AnimatedSection>
            </div>
        </div>
    );
};
