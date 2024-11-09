import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import auth from '../utils/auth';
import buddy from '../assets/buddy.png'
import Jobs from "./Jobs";
import './home.css';

const Home = () => {

  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  useEffect(() => {
    if (loginCheck) {
      fetchUsers();
    }
  }, [loginCheck]);

  console.log(users);

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
            <h1>
              Login to view all your Jobs!   <br />
            </h1>
            <img
              src={buddy}
              style={{ maxWidth: 500 }}
              alt="Job Search Guy image"
              className="login-image"
            />
            <h1></h1>
            
          </div>
        ) : (
          <Jobs />
        )}
    </>
  );
};

export default Home;