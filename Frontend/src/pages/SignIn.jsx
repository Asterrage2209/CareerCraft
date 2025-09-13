import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AnimatedSection from '../components/AnimatedSection';

const demoCredentials = {
    college: {
        email: 'college_demo@careercraft.test',
        password: 'College123!',
        role: 'college_student'
    },
    school: {
        email: 'school_demo@careercraft.test',
        password: 'School123!',
        role: 'school_student'
    }
};

export default function SignIn() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = (e) => {
        e.preventDefault();
        setError('');

        // TODO: Replace with backend auth
        if (email === demoCredentials.college.email && password === demoCredentials.college.password) {
            login({ email, role: demoCredentials.college.role });
            navigate('/');
        } else if (email === demoCredentials.school.email && password === demoCredentials.school.password) {
            login({ email, role: demoCredentials.school.role });
            navigate('/');
        } else {
            setError('Invalid credentials. Please use one of the demo accounts.');
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
                            create a new account
                        </Link>
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl space-y-4">
                    <div className="space-y-4">
                        <div className="bg-teal-50 dark:bg-teal-900/30 border-l-4 border-teal-500 text-teal-800 dark:text-teal-200 p-4 rounded-r-lg" role="alert">
                            <p className="font-bold">College Student Demo</p>
                            <p>Email: <strong>{demoCredentials.college.email}</strong></p>
                            <p>Password: <strong>{demoCredentials.college.password}</strong></p>
                        </div>
                        <div className="bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500 text-indigo-800 dark:text-indigo-200 p-4 rounded-r-lg" role="alert">
                            <p className="font-bold">School Student Demo</p>
                            <p>Email: <strong>{demoCredentials.school.email}</strong></p>
                            <p>Password: <strong>{demoCredentials.school.password}</strong></p>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={handleSignIn}>
                        <div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>

                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                        <div>
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </AnimatedSection>
        </div>
    );
}