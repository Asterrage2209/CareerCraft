import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AnimatedSection from '../components/AnimatedSection';
import { PasswordMeter } from '../components/Passwordmeter';
import { checkPasswordStrength } from '../utils/auth';

export default function SignUp() {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'college_student',
        password: '',
        confirmPassword: '',
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState(0);

    useEffect(() => {
        setPasswordStrength(checkPasswordStrength(formData.password));
    }, [formData.password]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePictureChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrors({ ...errors, profilePicture: 'File size must be less than 5MB' });
                return;
            }
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setErrors({ ...errors, profilePicture: 'Please select a valid image file' });
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfilePicture(event.target.result);
                setErrors({ ...errors, profilePicture: '' });
            };
            reader.readAsDataURL(file);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone number is invalid (10 digits required)';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Attempting signup with:', { email, password, name });
            
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password, name })
            });

            console.log('Response status:', response.status);
            
            const data = await response.json();
            console.log('Response data:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            // Handle successful signup
            navigate('/login');
        } catch (error) {
            console.error('Signup error:', error);
            setError(error.message);
        }
    };
    
    return (
        <div className="flex items-center justify-center py-12 px-4">
            <AnimatedSection className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Create a new account</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link to="/signin" className="font-medium text-teal-600 hover:text-teal-500">
                           Sign in here
                        </Link>
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                        
                        {/* Profile Picture Upload */}
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative">
                                <img 
                                    src={profilePicture || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDgiIGN5PSI0OCIgcj0iNDgiIGZpbGw9IiNGM0Y0RjYiLz4KPGNpcmNsZSBjeD0iNDgiIGN5PSIzNiIgcj0iMTIiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTI0IDc2QzI0IDY1LjYgMzIuNiA1NyA0MyA1N0g1M0M2My40IDU3IDcyIDY1LjYgNzIgNzZWNzZIMjRaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo='} 
                                    alt="Profile Preview" 
                                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
                                />
                                {profilePicture && (
                                    <button
                                        type="button"
                                        onClick={() => setProfilePicture(null)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                            <div>
                                <input
                                    type="file"
                                    id="profilePicture"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handlePictureChange}
                                />
                                <label 
                                    htmlFor="profilePicture" 
                                    className="cursor-pointer bg-teal-100 text-teal-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-200 dark:bg-teal-900 dark:text-teal-200 dark:hover:bg-teal-800"
                                >
                                    {profilePicture ? 'Change Photo' : 'Add Profile Photo'}
                                </label>
                            </div>
                            {errors.profilePicture && <p className="text-xs text-red-500">{errors.profilePicture}</p>}
                        </div>
                        
                        <InputField name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} error={errors.name} />
                        <InputField name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} error={errors.email} />
                        <InputField name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} error={errors.phone} />

                        <div className="space-y-2">
                             <label className="text-sm font-medium text-gray-700 dark:text-gray-300">I am a...</label>
                             <div className="flex gap-4">
                                 <RadioOption name="role" value="college_student" checked={formData.role === 'college_student'} onChange={handleChange} label="College Student" />
                                 <RadioOption name="role" value="school_student" checked={formData.role === 'school_student'} onChange={handleChange} label="School Student" />
                             </div>
                        </div>

                        <InputField name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} error={errors.password} />
                        <PasswordMeter strength={passwordStrength} />
                        
                        <InputField name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />

                        {errors.general && <p className="text-sm text-red-500 text-center">{errors.general}</p>}

                        <div>
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700">
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </AnimatedSection>
        </div>
    );
}

const InputField = ({ name, type, placeholder, value, onChange, error }) => (
    <div>
        <input 
            name={name} 
            type={type} 
            required 
            value={value} 
            onChange={onChange}
            className={`appearance-none rounded-lg relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            placeholder={placeholder} 
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
);

const RadioOption = ({ name, value, checked, onChange, label }) => (
    <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
        <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="form-radio h-4 w-4 text-teal-600" />
        <span>{label}</span>
    </label>
);