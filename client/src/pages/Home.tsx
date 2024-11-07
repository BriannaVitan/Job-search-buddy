import { useState, useEffect, useLayoutEffect, useCallback } from "react";
// import { retrieveUsers } from "../api/userAPI";
// import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import Jobs from "./Jobs.tsx";
import auth from "../utils/auth";

const Home = () => {
  // // const [users, setUsers] = useState<UserData[]>([]);
  const [error] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = useCallback(() => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  }, []);

  useEffect(() => {
    if (loginCheck) {
      fetchUsers();
    }
  }, [loginCheck]);

  useLayoutEffect(() => {
    checkLogin();
  }, [checkLogin]);

  // const fetchUsers = async () => {
  //     try {
  //         const data = await retrieveUsers();
  //         setUsers(data)
  //     } catch (err) {
  //         console.error('Failed to retrieve tickets:', err);
  //         setError(true);
  //     }
  // }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>{!loginCheck ? <p>Please log in to view job listings.</p> : <Jobs />}</>
  );

  function fetchUsers() {
    throw new Error("Function not implemented.");
  }
};

export default Home;
