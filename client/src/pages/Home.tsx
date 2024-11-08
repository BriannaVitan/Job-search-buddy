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

<<<<<<< HEAD
  useLayoutEffect(() => {
    checkLogin();
  }, [checkLogin]);



  if (error) {
    return <ErrorPage />;
  }

  return (
    <>{!loginCheck ? <p>Please log in to view job listings.</p> : <Jobs />}</>
  );

=======
    return (
        <>
            {
                !loginCheck ? (
                    <div className='login-notice'>
                        <h1>
                            Login to view all your Jobs!
                        </h1>
                    </div>
                ) : (
                    <UserList users={users} />
                )}
        </>
    );
>>>>>>> parent of cec6452 (Merge branch 'main' into melnew)
};

export default Home;
