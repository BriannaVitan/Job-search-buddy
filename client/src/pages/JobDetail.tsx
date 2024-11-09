import { useLocation } from 'react-router-dom';
import { Job } from '../interfaces/JobInterfaces';
import React from 'react';

const JobDetail: React.FC = () => {
    const location = useLocation();
    const job = location.state?.job as Job;

    // Function to convert HTML to XML-like structure
    const convertHtmlToXml = (htmlString: string): any => {
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

    // Function to transform XML Document to React components
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

    // if (!job) {
    //     return <div>Job not found</div>;
    // }

    return (
        <div>
            <h1>{job.jobTitle}</h1>
            <p>Company: {job.companyName}</p>
            <br />
            <p>Location: {job.jobGeo}</p>
            <br />
            <div>
                <h2>Description:</h2>
                {jobDescriptionContent}
            </div>
        </div>
    );
};

export default JobDetail;