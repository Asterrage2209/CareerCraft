import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { consultancyAPI } from '../utils/auth';
import AnimatedSection from '../components/AnimatedSection';

export default function Consultancy() {
    const { user, token, isAuthenticated } = useAuth();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [error, setError] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isAuthenticated && !sessionId) {
            initializeChat();
        }
    }, [isAuthenticated]);

    const initializeChat = async () => {
        try {
            const response = await consultancyAPI.createSession(token);
            setSessionId(response.sessionId);
            
            // Add welcome message
            setMessages([{
                sender: 'ai',
                text: `Hello ${user?.name}! I'm your AI career counselor. I'm here to help you with career guidance, skill development, and professional growth. What would you like to discuss today?`,
                timestamp: new Date()
            }]);
        } catch (error) {
            console.error('Failed to initialize chat:', error);
            setError('Failed to initialize chat. Please try again.');
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = {
            sender: 'user',
            text: inputMessage,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);
        setError('');

        try {
            const response = await consultancyAPI.getAdvice(inputMessage, sessionId, token);
            
            const aiMessage = {
                sender: 'ai',
                text: response.response,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Failed to get advice:', error);
            setError('Failed to get response. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="container mx-auto px-4 py-12">
                <AnimatedSection>
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold mb-4 text-gray-800 dark:text-white">AI Career Consultancy</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                            Please sign in to access the AI career counselor.
                        </p>
                    </div>
                </AnimatedSection>
            </div>
        );
    }

    return (
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
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                {msg.sender === 'ai' && (
                                    <div className="w-10 h-10 rounded-full bg-teal-500 flex-shrink-0 flex items-center justify-center font-bold text-white">
                                        AI
                                    </div>
                                )}
                                <div className={`max-w-xs md:max-w-md lg:max-w-lg p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-teal-600 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-end gap-3">
                                <div className="w-10 h-10 rounded-full bg-teal-500 flex-shrink-0 flex items-center justify-center font-bold text-white">
                                    AI
                                </div>
                                <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-2xl rounded-bl-none p-4">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    {error && (
                        <div className="px-6 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm">
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Type your message here..."
                                className="flex-1 p-3 bg-gray-200 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-white"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!inputMessage.trim() || isLoading}
                                className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </AnimatedSection>
        </div>
    );
}
