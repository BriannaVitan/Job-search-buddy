import { useState, useEffect } from 'react';
import getJobs from '../api/jobsAPI';
import getAffirm from '../api/affirmAPI';
import { Job } from '../interfaces/JobInterfaces';
import { Affirmation } from '../interfaces/AffirmInterface';

const Jobs: React.FC = () => {
    const [jobsArray, setJobs] = useState<Job[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [affirmation, setAffrim] = useState<Affirmation>();

    useEffect(() => {
        const fetchJobs = async () => {
            const data = await getJobs();
            if (data) {
                setJobs(data.jobs);
            } else {
                setError('Failed to load jobs.');
            }
        };
        fetchJobs();
    }, []);

    useEffect(() => {
        const fetchAffirm = async () => {
            const data = await getAffirm();
            if (data) {
                setAffrim(data);
            } else {
                setError('Failed to load jobs.');
            }
        };
        fetchAffirm();
    }, []);

console.log(jobsArray);//this logs the data from job API
console.log(affirmation);//this logs the data from affirm API

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Job Listings</h1>
            <p></p>
            <ul>
                {jobsArray.map((job) => (
                    <li key={job.id}>
                        <img></img>
                        <br></br>
                        <h1>{job.jobTitle}</h1>
                        <p>{affirmation?.affirmation}</p>
                        </li>
                ))}
            </ul>
        </div>
    );
};

export default Jobs;