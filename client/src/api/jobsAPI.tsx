const getJobs = async () => {
    try {
        const token = localStorage.getItem('id_token');

        const response = await fetch('/api/postings/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Invalid API response, check network tab!');
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Error from data retrieval:', err);
        return [];
    }
};

export default getJobs;