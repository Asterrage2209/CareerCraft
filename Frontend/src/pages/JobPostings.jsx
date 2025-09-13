import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { MapPin, Clock } from 'lucide-react';

const jobPosts = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        company: "Tech Solutions Inc.",
        logo: "https://placehold.co/100x100/0d9488/ffffff?text=TS",
        location: "Remote",
        type: "Full-time",
        description: "Seeking an experienced Frontend Developer to build beautiful and responsive user interfaces with React and Tailwind CSS.",
        requirements: ["5+ years of React experience", "Expertise in Tailwind CSS", "Strong understanding of web performance", "Bachelor's degree in CS or related field"],
        stipend: "$120,000 - $150,000 per year"
    },
    {
        id: 2,
        title: "Product Marketing Manager",
        company: "Innovate AI",
        logo: "https://placehold.co/100x100/db2777/ffffff?text=IA",
        location: "San Francisco, CA",
        type: "Full-time",
        description: "Drive the go-to-market strategy for our new AI-powered analytics platform. Strong background in B2B marketing required.",
        requirements: ["3+ years in product marketing", "Experience with SaaS products", "Excellent communication skills", "Proven track record of successful product launches"],
        stipend: "$110,000 - $140,000 per year"
    },
    {
        id: 3,
        title: "UX/UI Designer",
        company: "Creative Minds LLC",
        logo: "https://placehold.co/100x100/5b21b6/ffffff?text=CM",
        location: "New York, NY",
        type: "Contract",
        description: "We're looking for a talented designer to create intuitive and engaging user experiences for our mobile and web applications.",
        requirements: ["Portfolio of design projects", "Proficiency in Figma and Adobe Suite", "Understanding of user-centered design principles", "Experience with mobile-first design"],
        stipend: "$75 - $90 per hour"
    },
    {
        id: 4,
        title: "Junior Data Analyst",
        company: "DataDriven Co.",
        logo: "https://placehold.co/100x100/ca8a04/ffffff?text=DD",
        location: "Austin, TX",
        type: "Full-time",
        description: "Join our data team to analyze trends, create reports, and provide actionable insights. SQL and Python skills are a plus.",
        requirements: ["Proficiency in SQL and Python (Pandas)", "Experience with data visualization tools (Tableau, Power BI)", "Strong analytical and problem-solving skills", "Entry-level position, new grads welcome"],
        stipend: "$65,000 - $80,000 per year"
    }
];

export { jobPosts };

export default function JobPostings() {
    return (
        <div className="container mx-auto px-4 py-12">
            <AnimatedSection>
                <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-800 dark:text-white">Latest Job Postings</h1>
                <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
                    Explore curated job opportunities that match modern skill sets and career aspirations.
                </p>
            </AnimatedSection>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
                {jobPosts.map((job) => (
                    <AnimatedSection key={job.id}>
                        <Link to={`/jobs/${job.id}`} className="block h-full">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col h-full">
                                <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-500">{job.title}</h2>
                                <p className="font-semibold text-gray-700 dark:text-gray-300 mt-1">{job.company}</p>
                                <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400 my-4 text-sm">
                                    <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {job.location}</span>
                                    <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {job.type}</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 flex-grow">{job.description}</p>
                                <div className="mt-6 text-center bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors duration-300">
                                    View Details
                                </div>
                            </div>
                        </Link>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    );
}