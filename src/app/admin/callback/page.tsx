// app/admin/callback/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Loader2 } from 'lucide-react';

export default function Callback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const supabase = createClientComponentClient(); // Use shared client

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession(); // Use shared client
        if (error) {
          console.error('Error fetching session:', error.message);
          setError(error.message);
          return;
        }

        if (data.session) {
          router.push('/admin');
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
        <div>Error: {error}</div>
      ) : (
        <Loader2 className='text-white animate-spin' />
      )}
    </>
  );
}
