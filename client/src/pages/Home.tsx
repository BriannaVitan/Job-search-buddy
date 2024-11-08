import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import UserList from '../components/Users';
import auth from '../utils/auth';

const Home = () => {

    const [users, setUsers] = useState<UserData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);

    useEffect(() => {
        if (loginCheck) {
            fetchUsers();
        }
    }, [loginCheck]);

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await retrieveUsers();
            setUsers(data)
        } catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    }

    if (error) {
        return <ErrorPage />;
    }
    return (
    <>
        {
            !loginCheck ? (
                <div className='login-notice'>
                     {/* Add the image here */}
            <img 
                src="https://files.oaiusercontent.com/file-HNuO1CA7hAhlAKrb9pI9jlDn?se=2024-11-08T16%3A33%3A30Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D6363f6de-e1e0-41ac-a230-c777ecffd28e.webp&sig=IFRWwFKjViyTwOGo6t0prxx/nft06XHbP1Q0rery5og%3D" // Replace with your image path
                alt="Job Search Guy image"
                className="login-image" // Optional: add a CSS class for styling
            />
            <h1></h1>
                    <h1>
                     Login to view all your Jobs!   <br /> 
                        Encouraging your Job Search 
                    </h1>
                </div>
            ) : (
                <UserList users={users} />
            )}
    </>
);
};

export default Home;