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
