import React, { useState, useEffect } from 'react';
import AnimatedSection from '../components/AnimatedSection';

export default function Dashboard({ navigateTo }) {
    const carouselImages = [
      'https://placehold.co/1200x600/6366f1/ffffff?text=Innovation',
      'https://placehold.co/1200x600/ec4899/ffffff?text=Collaboration',
      'https://placehold.co/1200x600/10b981/ffffff?text=Growth'
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [carouselImages.length]);
    
    return (
        <div className="bg-gray-50 dark:bg-gray-900 pt-20 overflow-x-hidden">
            <header className="relative py-20 md:py-32">
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-white dark:from-gray-800 dark:to-gray-900 opacity-80"></div>
                 <div className="container mx-auto px-6 text-center relative z-10">
                    <AnimatedSection>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
                            Craft Your Future with <span className="text-indigo-600 dark:text-indigo-400">AI Precision</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                            CareerCraft is your personalized career advisor, leveraging AI to illuminate your path to success.
                        </p>
                        <button 
                            onClick={() => navigateTo('consultancy')}
                            className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                        >
                            Start Advising Session
                        </button>
                    </AnimatedSection>
                </div>
            </header>
            
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <AnimatedSection className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Why Choose CareerCraft?</h2>
                    </AnimatedSection>
                    <div className="grid md:grid-cols-3 gap-8">
                        <AnimatedSection className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">AI-Powered Insights</h3>
                            <p className="text-gray-600 dark:text-gray-400">Get data-driven recommendations for careers and skills.</p>
                        </AnimatedSection>
                        <AnimatedSection className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Live Job Postings</h3>
                            <p className="text-gray-600 dark:text-gray-400">Explore curated job opportunities updated in real-time.</p>
                        </AnimatedSection>
                        <AnimatedSection className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Personalized Chat</h3>
                            <p className="text-gray-600 dark:text-gray-400">Engage with our AI consultant to explore your career questions.</p>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
            
            <section className="bg-white dark:bg-gray-800 py-20">
              <div className="container mx-auto px-6">
                 <AnimatedSection className="relative h-64 md:h-96 w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
                    {carouselImages.map((src, index) => (
                        <img key={src} src={src} alt={`Carousel image ${index + 1}`} className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}/>
                    ))}
                 </AnimatedSection>
              </div>
            </section>
        </div>
    );
};
