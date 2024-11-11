import { useLocation, useNavigate, useParams } from 'react-router-dom'; 
import { Job } from '../interfaces/JobInterfaces';
import React, { useEffect, useState } from 'react';
import './jobDetail.css';
import getAffirm from '../api/affirmAPI';
import { Affirmation } from '../interfaces/AffirmInterface';
import buddy from '../assets/buddy.png'

const JobDetail: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [job, setJob] = useState<Job | null>(location.state?.job || null);
    const [affirmation, setAffirm] = useState<Affirmation | null>(null);

    useEffect(() => {
        const fetchAffirm = async () => {
            const data = await getAffirm();
            setAffirm(data);
        };
        fetchAffirm();
    }, []);

    useEffect(() => {
        if (!job && id) {
            const fetchJobById = async () => {
                try {
                    const response = await fetch(`/api/jobs/${id}`);
                    const data = await response.json();
                    setJob(data);
                } catch (error) {
                    console.error('Failed to fetch job data', error);
                    navigate('/');
                }
            };
            fetchJobById();
        }
    }, [job, id, navigate]);

    const saveJob = async (): Promise<void> => {
        if (!job) return;

        // Send the job data to the backend via POST request
        try {
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(job), // Convert job object to JSON
            });

            if (response.ok) {
                const savedJob = await response.json();
                console.log('Job saved successfully', savedJob);
                alert('Job saved successfully!');
            } else {
                console.error('Failed to save job');
                alert('Failed to save job');
            }
        } catch (error) {
            console.error('Error while saving job', error);
            alert('Error while saving job');
        }
    };

    if (!job) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <div className="job-detail-container">
            <img src={job.companyLogo} alt="Company Logo" />
            <h1>{job.jobTitle}</h1>
            <button className='button' onClick={saveJob}> Save Job </button> 
            
            <h2>Company</h2>
            <p className='blackText'>{job.companyName}</p>
            
            <h2>Location</h2>
            <p className='blackText'>{job.jobGeo}</p>

            <h2>Salary</h2>
            <p className='blackText'>{job.annualSalaryMax} {job.salaryCurrency}</p>
            
            <h3>Description:</h3>
            <div className="job-description-content">
                {job.jobDescription}
            </div>
        </div>
        <div className='buddy-container'>
            <span className='bubble'>{affirmation?.affirmation}!</span>
            <br></br>
            <img src={buddy} className='buddy'></img>
        </div>
        </>
    );
};

export default JobDetail;