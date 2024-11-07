import { useState, FormEvent, ChangeEvent } from "react";

import { UserSignUp } from "../interfaces/UserLogin";  // Import the interface for UserLogin

const SignUp = () => {
    // State to manage the login form data
    const [signUpData, setSignUpData] = useState<UserSignUp>({
        username: '',
        password: ''
    });

    // Handle changes in the input fields
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSignUpData({
            ...signUpData,
            [name]: value
        });
    };

    // Handle form submission for login
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            // Send a POST request to your backend's sign-up endpoint
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signUpData)
            });

            if (response.ok) {
                // Handle successful sign-up, e.g., redirect to login
                console.log("User signed up successfully");
            } else {
                // Handle errors, e.g., username already taken
                const errorData = await response.json();
                console.error("Error during sign-up:", errorData);
            }
        } catch (error) {
            console.error("Sign-up error:", error);
        }
    }

    return (
        <div className='form-container'>
            <form className='form login-form' onSubmit={handleSubmit}>
                <h1>Sign-Up</h1>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        className="form-input"
                        type='text'
                        name='username'
                        value={signUpData.username || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        className="form-input"
                        type='password'
                        name='password'
                        value={signUpData.password || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type='submit'>Sign-Up</button>
                </div>
            </form>
        </div>
    )
};

export default SignUp;