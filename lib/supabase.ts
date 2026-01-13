import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
  video?: string | null;
  featured: boolean;
  tags: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  created_at?: string;
  updated_at?: string;
}
