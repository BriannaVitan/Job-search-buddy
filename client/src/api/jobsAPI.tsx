import { JobApiResponse } from '../interfaces/JobInterfaces';

const getJobs = async (): Promise<JobApiResponse | null> => {
    try {
        const token = localStorage.getItem('id_token');
        if (!token) {
            throw new Error('Authentication token not found in local storage.');
        }

        const response = await fetch('/api/postings/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Invalid API response, check network tab!');
        }

        const data: JobApiResponse = await response.json();
        return data;
    } catch (err) {
        console.log('Error from data retrieval:', err);
        return null;
    }
};

export default getJobs;