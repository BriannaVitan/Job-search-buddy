import { useState, useEffect } from 'react';
import getJobs from '../api/jobsAPI';

interface Job {
    id: number;
    title: string;
}

const Jobs: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data: Job[] = await getJobs();
                setJobs(data);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchJobs();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Job Listings</h1>
            <ul>
                {jobs.map((job) => (
                    <li key={job.id}>{job.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Jobs;