// app/admin/callback/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Loader2 } from 'lucide-react';

const supabase = createClientComponentClient(); 

export default function Callback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession(); 
        if (error) {
          setError(error.message);
          return;
        }

        if (data.session) {
          const res = await fetch('/api/admin/callback',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: data.session.user.email }),
          })

          if(res.ok) {router.push('/admin');}
            
          else {
            const errorMessage = await res.json()
            setError(errorMessage.error + " redirecting to login page...")

            setTimeout(() => {
              supabase.auth.signOut();
              router.push('/admin/login');
            }, 3000);
          }

        } else {
          setError(error);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred while processing your request.');
      }
    };

    checkSession();
  }, [router]);

  return (
    <>
      {error ? (
        <div className=' text-white'>Error: {error}</div>
      ) : (
        <Loader2 className='text-white animate-spin' />
      )}
    </>
  );
}
