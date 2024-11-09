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
        <>
        <div>
            <h1>Job Listings</h1>
             <p></p>
            <ul>
                 {jobsArray.map((job) => (
                    <li key={job.id} onClick={() => handleCardClick(job)}>
            <section id="blog-1540">
                <div className="cs-container">
                    <div className="cs-content">
                        <span className="cs-topper">Upcoming Events</span>
                        <h2 className="cs-title">Open Job Listings</h2>
                        <p className="cs-text">
                           Encouraging you to further your career click by click!
                        </p>
                    </div>
                    <ul className="cs-card-group">
                        <li className="cs-item">
                            <a href="#" className="cs-link">
                                <div className="cs-picture-group">
                                    <picture className="cs-picture" aria-hidden="true">
                                        <source media="(max-width: 600px)" srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/daycare1.jpg" />
                                        <source media="(min-width: 601px)" srcSet={job.companyLogo} />
                                        <img loading="lazy" decoding="async" src={job.companyLogo} width="365" height="201" alt="Daycare activity" />
                                    </picture>
                                    <svg className="cs-mask" width="369" height="249" viewBox="0 0 369 249" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                        <g clipPath="url(#clip0_3335_6487)">
                                            <path d="M369 249V105.57H364.72L360.02 177.28L350.1 221.22L338.48 233.69L294.54 231.71L227.65 231.14L159.67 232.48L102.92 238.23L43.73 243.79L31 238.99L24.33 229L8.32 177.28L5.69 111.52L0 110.67V249H369Z" fill="var(--maskBG)" />
                                            <path d="M0 0H369V114.64L364.64 113.67L364.72 77.5L356.91 50.01L348.69 27.11L329.08 10.47L296.81 4.93L28.9 9.69L21.28 14.57L15.61 25.63L4 124.51H0V0Z" fill="var(--maskBG)" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M366 4H4V245H366V4ZM31 239C-4.86 193.71 3.34 85.57 14 31C17.78 11.59 25.37 8.61 42 8C107.73 5.59 193.2 4.66 300 5C325.79 5.1 347.16 14.21 356 43C370.28 89.64 364.08 137.32 358.09 183.32L358 184C356.03 199.42 352.41 212.38 347 224C343.96 230.49 339.5 233.58 333 233C234.49 224.39 139.41 232.28 42 244C39.88 244.27 37.99 243.86 36 243C34.01 242.14 32.41 240.79 31 239Z" fill="var(--maskBG)" />
                                            <path d="M13.9996 30.9899C9.37956 54.6199 5.22956 88.2999 4.90956 122.57C4.49956 167.43 10.6696 213.31 30.9996 238.99C32.4096 240.78 34.0096 242.13 35.9996 242.99C37.9896 243.85 39.8796 244.26 41.9996 243.99C139.42 232.27 234.49 224.38 333 232.99C339.5 233.57 343.96 230.48 347 223.99C352.41 212.37 356.02 199.41 358 183.99C364.01 137.78 370.35 89.8599 356 42.9899C347.16 14.1999 325.79 5.08989 300 4.98989C193.2 4.64989 107.73 5.57989 41.9996 7.98989C25.3696 8.59989 17.7796 11.5799 13.9996 30.9899Z" stroke="var(--maskBorder)" strokeWidth="8" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3335_6487">
                                                <rect width="369" height="249" fill="var(--maskBG)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="cs-info">
                                    <div className="cs-flex">
                                        <span className="cs-tag">Jobs</span>
                                        <span className="cs-date">
                                            <img className="cs-icon" loading="lazy" decoding="async" src= {job.companyLogo} style={{maxWidth: 200}} alt="Calendar icon" width="24" height="24" aria-hidden="true" />
                                            
                                        </span>
                                    </div>
                                    <h3 className="cs-h3">10 easy steps to learn more about play freehand</h3>
                                    <p className="cs-item-text">
                                        An evening event where children and parents come together for storytelling, stargazing, building...
                                    </p>
                                    <div className="cs-bottom">
                                        <div className="cs-author-group">
                                        </div>
                                        <picture className="cs-wrapper">
                                            <img className="cs-arrow" loading="lazy" decoding="async" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/grey-right-chevron.svg" alt="Arrow icon" width="24" height="24" aria-hidden="true" />
                                        </picture>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
            </li>
                ))}
            </ul>
        </div> 
        </>
    );
};

export default Jobs;
  
//{affirmation?.affirmation}




// {/* <div>
//             <h1>Job Listings</h1>
//             <p></p>
//             <ul>
//                 {jobsArray.map((job) => (
//                     <li key={job.id} onClick={() => handleCardClick(job)}>
//                         <img src= {job.companyLogo} style={{maxWidth: 200}}></img>
//                         <h2>{job.jobTitle}</h2>
//                         <p>Company: {job.companyName}</p>
//                         <p>Location: {job.jobGeo}</p>
//                         </li>
//                 ))}
//             </ul>
//         </div> */}