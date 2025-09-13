import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AnimatedSection from '../components/AnimatedSection';
import PasswordMeter from '../components/PasswordMeter';
import { checkPasswordStrength } from '../utils/auth';

export default function SignUp() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'college_student',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState(0);

    useEffect(() => {
        setPasswordStrength(checkPasswordStrength(formData.password));
    }, [formData.password]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            // TODO: Replace with backend registration
            console.log('Form submitted successfully:', formData);
            login({ email: formData.email, name: formData.name, role: formData.role });
            navigate('/');
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