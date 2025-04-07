import { supabase } from '@/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    const {data, error} = await supabase.auth.signInWithOAuth({
      provider:'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/callback`,
      }
    });

    if (error) {
      console.error('Supabase Auth Error:', error.message);
      return NextResponse.json(
        { error: 'Failed to initiate authentication', details: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: true, message: 'Check your email for the login link!' },)

    /* 
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
    
    const userAgent = request.headers.get('user-agent') || 'unknown'; 

    // Email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      await logAttempt(email, 'failed', 'Invalid email format');
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Whitelist check
    const { data: whitelistData, error: whitelistError } = await supabase
      .from('admin_whitelist')
      .select('email')
      .eq('email', email)
      .single();

    if (whitelistError || !whitelistData) {
      await logAttempt(email, 'failed', 'Email not whitelisted');
      return NextResponse.json(
        { error: 'Email not authorized for admin access' },
        { status: 403 }
      );
    }

    // Magic link sending
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/callback`,
        shouldCreateUser: true,
      },
    }); 

    if (authError) {
      console.error('Supabase Auth Error:', authError.message);
      return NextResponse.json(
        { error: 'Failed to send authentication email', details: authError.message },
        { status: 400 }
      );
    }

    await logAttempt(email, 'success');
    return NextResponse.json(
      { success: true, message: 'Check your email for the login link!' },
      { status: 200 }
    );
*/
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { 
        error: 'Authentication failed',
        details: error instanceof Error ? error.message : undefined 
      },
      { status: 500 }
    );
  }
}
