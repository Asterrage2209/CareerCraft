import React from 'react';
import { Navigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

// Hardcoded chat data
const chatMessages = [
    { sender: 'user', text: "Hi, I'm looking for a career change. I have a background in marketing but I'm interested in tech." },
    { sender: 'ai', text: "That's a popular path! With a marketing background, you have strong communication skills. Have you considered roles like Product Marketing Manager or UX Writer in a tech company?" },
    { sender: 'user', text: "Product Marketing sounds interesting. What skills would I need?" },
    { sender: 'ai', text: "You'd need to build on your existing skills with product lifecycle knowledge, competitive analysis, and some technical literacy. I can recommend some online courses if you'd like." },
    { sender: 'user', text: "Yes, please!" },
    { sender: 'ai', text: "Great! Here are a few top-rated courses on Coursera and Udemy to get you started on your journey to becoming a Product Marketing Manager." }
];

export default function Consultancy({ isLoggedIn }) {
    // If not logged in, redirect to the signin page
    if (!isLoggedIn) {
        return <Navigate to="/signin" replace />;
    }

    return (
        // Single parent element to wrap the entire component's output
        <div className="container mx-auto px-4 py-12">
            <AnimatedSection>
                <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-800 dark:text-white">AI Career Consultancy</h1>
                <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
                    Chat with our advanced AI to get personalized career advice, skill recommendations, and roadmap planning.
                </p>
            </AnimatedSection>

            <AnimatedSection>
                <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-6 h-[60vh] overflow-y-auto flex flex-col space-y-4">
                        {chatMessages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                {msg.sender === 'ai' && (
                                    <div className="w-10 h-10 rounded-full bg-teal-500 flex-shrink-0 flex items-center justify-center font-bold text-white">
                                        AI
                                    </div>
                                )}
                                <div className={`max-w-xs md:max-w-md lg:max-w-lg p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-teal-600 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                                    <p>{msg.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <input
                            type="text"
                            placeholder="Type your message here..."
                            className="w-full p-3 bg-gray-200 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                            disabled
                        />
                    </div>
                </div>
            </AnimatedSection>
        </div>
    );
}