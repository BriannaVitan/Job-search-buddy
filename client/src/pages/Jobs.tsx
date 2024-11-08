import { useState, useEffect } from 'react';
import getJobs from '../api/jobsAPI';
import getAffirm from '../api/affirmAPI';
import { Job } from '../interfaces/JobInterfaces';
import { Affirmation } from '../interfaces/AffirmInterface';
import { useNavigate } from 'react-router-dom';

const Jobs: React.FC = () => {
    const [jobsArray, setJobs] = useState<Job[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [affirmation, setAffrim] = useState<Affirmation>();
    const navigate = useNavigate();

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

    const handleCardClick = (job: Job) => {
        navigate(`/Jobs/${job.id}`, { state: { job } });
    };

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
                    <li key={job.id} onClick={() => handleCardClick(job)}>
                        <img src= {job.companyLogo} style={{maxWidth: 200}}></img>
                        <h2>{job.jobTitle}</h2>
                        <p>Company: {job.companyName}</p>
                        <p>Location: {job.jobGeo}</p>
                        </li>
                ))}
            </ul>
        </div>
    );
};

//{affirmation?.affirmation}

export default Jobs;