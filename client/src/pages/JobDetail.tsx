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

    const convertHtmlToXml = (htmlString: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        const tagMappings: { [key: string]: string } = {
            'p': 'paragraph',
            'ul': 'list',
            'li': 'item',
            'h2': 'section',
            'strong': 'strong',
        };

        const transformNode = (node: ChildNode): Node | null => {
            if (node.nodeType === Node.TEXT_NODE) {
                return document.createTextNode(node.textContent || '');
            }

            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement;
                const newTag = tagMappings[element.tagName.toLowerCase()] || element.tagName.toLowerCase();
                const transformedNode = document.createElement(newTag);

                if (newTag === 'section') {
                    transformedNode.setAttribute('title', element.textContent?.trim() || '');
                }

                Array.from(element.childNodes).forEach(child => {
                    const transformedChild = transformNode(child);
                    if (transformedChild) {
                        transformedNode.appendChild(transformedChild);
                    }
                });

                return transformedNode;
            }

            return null;
        };

        const root = document.createElement('JobDescription');
        Array.from(doc.body.childNodes).forEach(child => {
            const transformedChild = transformNode(child);
            if (transformedChild) {
                root.appendChild(transformedChild);
            }
        });

        return root;
    };

    const saveJob = (): void => {
        // Get existing jobs from localStorage, or initialize an empty array if no jobs are found
        const allJobs: Job[] = JSON.parse(localStorage.getItem("savedJobs") || '[]');
    
        // Add the current job to the array
        if (job) {
            allJobs.push(job);
        }
    
        // Save the updated array back to localStorage
        localStorage.setItem("savedJobs", JSON.stringify(allJobs));
    }


    const xmlToReact = (xmlNode: Node): React.ReactNode => {
        if (xmlNode.nodeType === Node.TEXT_NODE) {
            return xmlNode.textContent;
        }

        if (xmlNode.nodeType === Node.ELEMENT_NODE) {
            const element = xmlNode as Element;
            const tagName = element.tagName.toLowerCase();
            const childNodes = Array.from(element.childNodes).map(xmlToReact);

            switch (tagName) {
                case 'jobdescription':
                    return <div>{childNodes}</div>;
                case 'paragraph':
                    return <p>{childNodes}</p>;
                case 'list':
                    return <ul>{childNodes}</ul>;
                case 'item':
                    return <li>{childNodes}</li>;
                case 'section':
                    return <h2>{element.getAttribute('title')}</h2>;
                default:
                    return <span>{childNodes}</span>;
            }
        }

        return null;
    };

    const jobDescriptionXml = job ? convertHtmlToXml(job.jobDescription) : null;
    const jobDescriptionContent = jobDescriptionXml ? xmlToReact(jobDescriptionXml) : '';

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
                {jobDescriptionContent}
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
