import React from 'react';
import { Navigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { Briefcase, MapPin, Clock } from 'lucide-react';

const jobPosts = [
    {
        title: "Senior Frontend Developer",
        company: "Tech Solutions Inc.",
        location: "Remote",
        type: "Full-time",
        description: "Seeking an experienced Frontend Developer to build beautiful and responsive user interfaces with React and Tailwind CSS."
    },
    {
        title: "Product Marketing Manager",
        company: "Innovate AI",
        location: "San Francisco, CA",
        type: "Full-time",
        description: "Drive the go-to-market strategy for our new AI-powered analytics platform. Strong background in B2B marketing required."
    },
    {
        title: "UX/UI Designer",
        company: "Creative Minds LLC",
        location: "New York, NY",
        type: "Contract",
        description: "We're looking for a talented designer to create intuitive and engaging user experiences for our mobile and web applications."
    },
    {
        title: "Junior Data Analyst",
        company: "DataDriven Co.",
        location: "Austin, TX",
        type: "Full-time",
        description: "Join our data team to analyze trends, create reports, and provide actionable insights. SQL and Python skills are a plus."
    }
];

export default function JobPostings({ isLoggedIn }) {
    if (!isLoggedIn) {
        return <Navigate to="/signin" replace />;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <AnimatedSection>
                <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-800 dark:text-white">Latest Job Postings</h1>
                <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
                    Explore curated job opportunities that match modern skill sets and career aspirations.
                </p>
            </AnimatedSection>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
                {jobPosts.map((job, index) => (
                    <AnimatedSection key={index}>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col h-full">
                            <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-500">{job.title}</h2>
                            <p className="font-semibold text-gray-700 dark:text-gray-300 mt-1">{job.company}</p>
                            <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400 my-4 text-sm">
                                <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {job.location}</span>
                                <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {job.type}</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 flex-grow">{job.description}</p>
                            <button className="mt-6 w-full bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors duration-300">
                                Apply Now
                            </button>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    );
}