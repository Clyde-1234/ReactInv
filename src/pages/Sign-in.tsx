import { useEffect} from 'react'

import { Link, Navigate } from 'react-router-dom'

import { sessionAtom } from '../atoms.ts'
import { useAtom } from 'jotai'

import { supabase } from '../../supabaseClient.ts'
import { Auth, SignIn } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

function SignInUI() {
  const [session, setSession] = useAtom(sessionAtom)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      // @ts-ignore
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // @ts-ignore
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])
  //@ts-ignore
  const introduction = (session?.user?.user_metadata?.name)

  console.log(session)

  const signUpWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
  }

  const signUpWithFacebook = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'facebook'
    })
  }

  if (!session) {
    return (
        <div className=' flex-col'>
            <button onClick={signUpWithGoogle}>
                Sign with Google
            </button>

            <button onClick={signUpWithFacebook}>
                Sign with Facebook
            </button>
            {/* <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} /> */}
            <form action="">
                <h2 className=' pt-16 text-lg'>Sign up with email</h2>
                <p>
                    Already have an account? <Link to={"/signin"}>Sign in!</Link>
                </p>
            </form>
        </div>  
  )
  }
  else {
    return (
      <Navigate to="/home"/>
  )
  }
}


export default SignInUI