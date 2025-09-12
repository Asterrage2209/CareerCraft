import React from 'react';
import AnimatedSection from '../components/AnimatedSection';

export default function JobPostings() {
    const hardcodedJobs = [
        { title: 'Senior Frontend Engineer (React)', company: 'InnovateTech', location: 'Remote', postedDate: '2 days ago', tags: ['React', 'TypeScript', 'Senior'] },
        { title: 'Junior UI/UX Designer', company: 'Creative Minds Inc.', location: 'New York, NY', postedDate: '5 days ago', tags: ['UI/UX', 'Figma', 'Junior'] },
        { title: 'Full-Stack Developer (Node.js)', company: 'DataDriven Co.', location: 'San Francisco, CA', postedDate: '1 week ago', tags: ['Node.js', 'Full-Stack', 'Mid-Level'] },
        { title: 'DevOps Engineer', company: 'CloudFlow', location: 'Remote', postedDate: '1 week ago', tags: ['AWS', 'DevOps', 'Kubernetes'] }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
            <div className="container mx-auto px-6">
                <AnimatedSection className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Latest Job Openings</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Find your next career opportunity.</p>
                </AnimatedSection>
                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {hardcodedJobs.map((job, index) => (
                        <AnimatedSection key={index}>
                           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl p-6 transition-shadow duration-300">
                                <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{job.title}</h2>
                                <p className="text-md font-semibold text-gray-700 dark:text-gray-300 mt-1">{job.company} - <span className="font-normal text-gray-500 dark:text-gray-400">{job.location}</span></p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {job.tags.map(tag => (
                                        <span key={tag} className="text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 px-2 py-1 rounded-full">{tag}</span>
                                    ))}
                                </div>
                                <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">Apply Now</button>
                           </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </div>
    );
};
