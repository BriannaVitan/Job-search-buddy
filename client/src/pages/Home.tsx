import { useState, useLayoutEffect, useCallback } from "react";
import ErrorPage from "./ErrorPage";
import Jobs from "./Jobs.tsx";
import auth from "../utils/auth";

const Home = () => {
 
  const [error] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = useCallback(() => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  }, []);


  useLayoutEffect(() => {
    checkLogin();
  }, [checkLogin]);



  if (error) {
    return <ErrorPage />;
  }

  return (
    <>{!loginCheck ? <p>Please log in to view job listings.</p> : <Jobs />}</>
  );

};

export default Home;
