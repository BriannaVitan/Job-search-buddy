import { useState, useEffect } from 'react';
import getJobs from '../api/jobsAPI';
import getAffirm from '../api/affirmAPI';
import { Job } from '../interfaces/JobInterfaces';
import { Affirmation } from '../interfaces/AffirmInterface';
import { useNavigate } from 'react-router-dom';
import './jobs.css';

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
                setError('Failed to load affirmAPI.');
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
        <>
            <h1>Job Listings</h1>
            <p className="cs-text">Encouraging you to further your career click by click!</p>
            <section id="blog-1540">
                <div className="cs-container">
                    <ul className="cs-card-group">
                        {jobsArray.map((job) => (
                            <li className="cs-item" key={job.id} onClick={() => handleCardClick(job)}>
                                <a href="#" className="cs-link">
                                    <div className="cs-picture-group">
                                        <img loading="lazy" decoding="async" src={job.companyLogo} alt="company logo" />
                                    </div>
                                    <div className="cs-info">
                                        <span className="cs-tag">{job.companyName}</span>
                                        <h3 className="cs-h3">{job.jobTitle}</h3>
                                        <p className="cs-item-text">{job.jobIndustry}</p>
                                        <div className="cs-bottom">
                                            <div className="cs-author-group">
                                                <span className="cs-name">
                                                    Location: {job.jobGeo}
                                                    <span className="cs-job">Salary: {job.annualSalaryMax} {job.salaryCurrency}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
};

export default Jobs;
