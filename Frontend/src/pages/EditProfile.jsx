import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authAPI } from '../utils/auth';
import AnimatedSection from '../components/AnimatedSection';

export default function EditProfile() {
    const { user, updateUser, token } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
    });
    const [profilePic, setProfilePic] = useState(user?.profilePicture || null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePictureChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfilePic(event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update user data on backend
            const response = await authAPI.updateProfile({
                name: formData.name,
                phone: formData.phone,
                profilePicture: profilePic
            }, token);
            
            // Update user data locally
            updateUser({...formData, profilePicture: profilePic});
            console.log("Profile Saved successfully:", response);
            navigate('/'); 
        } catch (error) {
            console.error('Error updating profile:', error);
            // Still update locally as fallback
            updateUser({...formData, profilePicture: profilePic});
            navigate('/');
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <AnimatedSection className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800 dark:text-white">Edit Profile</h1>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col items-center space-y-4">
                            <img 
                                src={profilePic || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNjQiIHI9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNDgiIHI9IjE2IiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0zMiAxMDFDMzIgODcuNjQgNDMuNjQgNzYgNTcgNzZINzFDODQuMzYgNzYgOTYgODcuNjQgOTYgMTAxVjEwMUgzMloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+Cg=='} 
                                alt="Profile" 
                                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600" 
                            />
                            <input
                                type="file"
                                id="profilePicture"
                                className="hidden"
                                accept="image/*"
                                onChange={handlePictureChange}
                            />
                            <label htmlFor="profilePicture" className="cursor-pointer bg-teal-100 text-teal-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-200">
                                Change Picture
                            </label>
                        </div>
                        
                        <InputField label="Full Name" name="name" type="text" value={formData.name} onChange={handleChange} />
                        <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} />
                        <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} />

                        <div className="flex justify-end gap-4 pt-4">
                             <button type="button" onClick={() => navigate('/')} className="px-6 py-2 rounded-lg text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">
                                Cancel
                            </button>
                            <button type="submit" className="px-6 py-2 rounded-lg text-white bg-teal-600 hover:bg-teal-700">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </AnimatedSection>
        </div>
    );
}

const InputField = ({ label, name, type, value, onChange }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
        />
    </div>
);