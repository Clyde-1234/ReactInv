import { useEffect, useState } from 'react';
import styles from './StyleModules/Sign-in.module.css';
import { Link, Navigate } from 'react-router-dom';

import { sessionAtom } from '../atoms.ts';
import { useAtom } from 'jotai';

import { supabase } from '../../supabaseClient.ts';

function SignInUI() {
  const [session, setSession] = useAtom(sessionAtom);

  // State to track email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      //@ts-ignore
      setSession(session);
      if (error) {
        console.log(error.message);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      //@ts-ignore
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUpWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  const signUpWithFacebook = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'facebook',
    });
  };
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

  if (!session) {
    return (
      <div className="flex-col space-y-4 ">
        <form
          onSubmit={handleSubmit}
          className="flex-col items-center place-items-center"
        >
          <h2 className="pt-16 text-2xl mb-4">Sign in with email</h2>
          <p>
            Don't have an account? <Link to={'/signin'}>Sign up!</Link>
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
              Sign in with Email
            </button>
            
          </div>

          {formError && (
            <p className="text-red-500 mt-2">{formError}</p>
          )}

          <span> or </span>        

          
        </form>

        <button onClick={signUpWithGoogle}>Sign with Google</button>

        <button onClick={signUpWithFacebook}>Sign with Facebook</button>
      </div>
    );
  } else {
    return <Navigate to="/storehouse" />;
  }
}

export default SignInUI;
