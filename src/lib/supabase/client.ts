import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../types/database';

export const createBrowserSupabaseClient = () => {
  return createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    }
  );
};

// 创建默认客户端实例
export const supabase = createBrowserSupabaseClient(); 