import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import './navbar.css';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, [loginCheck]);

  return (
    <div className="navbar">
      <h1 className="navbar-title">
        Job Search Buddy
      </h1>
      <div className="navbar-buttons">
        {

          !loginCheck ? (
            <button className="btn" type="button">
              <Link to="/login" className="btn-link">Login</Link>
            </button>
          ) : (
            <>
              <button className="btn" type="button">
                <Link to="/Jobs" className="btn-link">Job Listings</Link>
              </button>
              <button className="btn" type="button" onClick={() => {
                auth.logout();
              }}>Logout</button>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Navbar;
