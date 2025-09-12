import React, { useEffect, useRef } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { UserIcon, SendIcon } from '../components/Icons';

export default function Consultancy() {
    const hardcodedChat = [
        { sender: 'ai', text: 'Hello! I am your AI Career Advisor. How can I help you explore your career path today?' },
        { sender: 'user', text: "Hi, I'm interested in software development, but I'm not sure where to start." },
        { sender: 'ai', text: "That's a great field! To give you the best advice, could you tell me what aspects of technology you enjoy most?" },
        { sender: 'user', text: "I think building websites and apps that people can interact with sounds really cool." },
        { sender: 'ai', text: "Excellent! That points towards Frontend Development. I'd recommend starting with HTML, CSS, and JavaScript. Once you're comfortable, learning a framework like React is a fantastic next step." },
    ];
    
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [hardcodedChat]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center pt-24 pb-8 px-4">
            <div className="w-full max-w-3xl h-[75vh] flex flex-col">
                <AnimatedSection className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex-grow flex flex-col">
                    <div className="p-4 border-b dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center">AI Advising Session</h2>
                    </div>
                    <div className="flex-grow p-6 overflow-y-auto space-y-4">
                        {hardcodedChat.map((message, index) => (
                            <div key={index} className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {message.sender === 'ai' && (
                                     <div className="h-8 w-8 rounded-full bg-indigo-500 text-white flex items-center justify-center flex-shrink-0">AI</div>
                                )}
                                <div className={`px-4 py-2 rounded-2xl max-w-sm md:max-w-md ${message.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                                    {message.text}
                                </div>
                                {message.sender === 'user' && (
                                     <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-700 flex items-center justify-center flex-shrink-0">
                                         <UserIcon className="h-5 w-5"/>
                                     </div>
                                )}
                            </div>
                        ))}
                         <div ref={chatEndRef} />
                    </div>
                    <div className="p-4 border-t dark:border-gray-700">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Chat is disabled for this demo..."
                                disabled
                                className="w-full bg-gray-100 dark:bg-gray-700 rounded-full py-3 pl-5 pr-12 text-gray-500 dark:text-gray-400 focus:outline-none"
                            />
                            <button disabled className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-300 dark:bg-gray-600 cursor-not-allowed">
                               <SendIcon className="text-white"/>
                            </button>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
};
