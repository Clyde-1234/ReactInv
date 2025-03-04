import React from "react";
import { Link } from "react-router-dom";
import styles from './StyleModules/Sign-in.module.css';
import { useEffect, useState } from "react";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState('');


    //@ts-ignore
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission

        // Validation check
        if (!email || !password) {
        setFormError('Please fill in both email and password.');
        return;
        }

        setFormError('');
        console.log('Form submitted:', { email, password });

        // Proceed with your signup logic (e.g., Supabase signUp)
    };

    return(
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex-col space-y-4 items-center place-items-center"
                >
                <h2 className="pt-16 text-2xl mb-4">Sign up with email</h2>
                <p>
                    Already have an account?  <Link to='/'>Sign in!</Link>
                </p>
                <div className="flex flex-col items-center">
                    <input
                    type="email"
                    name="email"
                    id="email"
                    className={styles.input}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                    type="password"
                    name="password"
                    id="password"
                    className={styles.input}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="mt-4">
                    Sign up with Email
                    </button>
                    
                </div>

                {formError && (
                    <p className="text-red-500 mt-2">{formError}</p>
                )}
                
            </form>
        </div>
    )
}


export default Signup