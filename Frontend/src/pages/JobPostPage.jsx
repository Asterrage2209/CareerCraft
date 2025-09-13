import React from 'react';
import { useParams, Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { jobPosts } from './JobPostings'; 
import { MapPin, Clock, ArrowLeft, DollarSign } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function JobPostPage() {
    const { jobId } = useParams();
    const { isAuthenticated } = useAuth();
    const job = jobPosts.find(p => p.id === parseInt(jobId));

    if (!job) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold">Job not found</h1>
                <Link to="/jobs" className="text-teal-500 hover:underline mt-4 inline-block">Back to Job Postings</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <AnimatedSection className="max-w-3xl mx-auto">
                <Link to="/jobs" className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold mb-8">
                    <ArrowLeft size={20} />
                    Back to all jobs
                </Link>
                
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    <div className="flex items-start gap-6 mb-6">
                        <img 
                            src={job.logo} 
                            alt={`${job.company} logo`}
                            className="w-20 h-20 rounded-xl"
                        />
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{job.title}</h1>
                            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-1">{job.company}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-500 dark:text-gray-400 mb-6 text-md">
                        <span className="flex items-center gap-2"><MapPin size={18} /> {job.location}</span>
                        <span className="flex items-center gap-2"><Clock size={18} /> {job.type}</span>
                        <span className="flex items-center gap-2"><DollarSign size={18} /> {job.stipend}</span>
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Requirements</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            {job.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="mt-8">
                        <button 
                            disabled={!isAuthenticated}
                            className="w-full bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isAuthenticated ? 'Apply Now' : 'Sign In to Apply'}
                        </button>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    );
}