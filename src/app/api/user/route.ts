// src/app/api/user/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        const { data: users, error: getError } = await supabase
          .from('admin_users')
          .select('*');
        
        if (getError) {
          throw new Error('Failed to fetch users');
        }
        return res.status(200).json(users);

      case 'POST':
        const { username, email } = req.body;
        
        if (!username || !email) {
          return res.status(400).json({ 
            error: 'Username and email are required' 
          });
        }

        const { data: newUser, error: postError } = await supabase
          .from('admin_users')
          .insert([{ username, email }])
          .select();
        
        if (postError) {
          throw new Error('Failed to grant admin access');
        }
        return res.status(200).json({ 
          message: 'Admin added successfully', 
          user: newUser 
        });

      case 'DELETE':
        const { id } = req.body;
        
        if (!id) {
          return res.status(400).json({ 
            error: 'Admin ID is required' 
          });
        }

        const { error: deleteError } = await supabase
          .from('admin_users')
          .delete()
          .eq('id', id);
        
        if (deleteError) {
          throw new Error('Failed to remove user from the admin list');
        }
        return res.status(200).json({ 
          message: 'Admin removed successfully' 
        });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        return res.status(405).json({ 
          error: `Method ${req.method} Not Allowed` 
        });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Internal Server Error' 
    });
  }
}