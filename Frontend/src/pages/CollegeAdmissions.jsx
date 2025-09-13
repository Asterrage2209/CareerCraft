import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { School, ArrowRight } from 'lucide-react';

const admissionItems = [
    {
        title: "Top Engineering Programs",
        description: "Explore the leading universities for computer science, mechanical engineering, and more.",
    },
    {
        title: "Guide to Liberal Arts",
        description: "Discover the benefits of a liberal arts education and find the right fit for you.",
    },
    {
        title: "Scholarship Opportunities",
        description: "Learn how to find and apply for scholarships to fund your college education.",
    },
    {
        title: "SAT/ACT Prep Strategies",
        description: "Get expert tips and resources to ace your standardized tests.",
    }
];

export default function CollegeAdmissions() {
    return (
        <div className="container mx-auto px-4 py-12">
            <AnimatedSection>
                <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-800 dark:text-white">College Admissions Guidance</h1>
                <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
                    Find resources, tips, and guidance for your college application journey.
                </p>
            </AnimatedSection>

            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                {admissionItems.map((item, index) => (
                    <AnimatedSection key={index}>
                        <a href="https://nirmauni.ac.in/" target="_blank" rel="noopener noreferrer" className="block h-full">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col h-full">
                                <div className="flex items-center mb-4">
                                    <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full mr-4">
                                        <School className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-500">{item.title}</h2>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 flex-grow mb-4">{item.description}</p>
                                <div className="mt-auto text-teal-600 dark:text-teal-400 font-semibold flex items-center">
                                    Learn More <ArrowRight className="h-4 w-4 ml-2" />
                                </div>
                            </div>
                        </a>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    );
}