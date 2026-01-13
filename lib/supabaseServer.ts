import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set.');
}

if (!serviceRoleKey && !anonKey) {
  throw new Error('Supabase credentials are not set. Provide SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY.');
}

const clientKey = serviceRoleKey || anonKey || '';

if (!serviceRoleKey) {
  console.warn('[Supabase] SUPABASE_SERVICE_ROLE_KEY not found. Falling back to public anon key. Some operations (like Storage uploads) may fail until the service role key is configured.');
}

export const supabaseServer = createClient(supabaseUrl, clientKey, {
  auth: {
    persistSession: false,
  },
});
