import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  image: string;
  type?: 'article' | 'video';
  video_id?: string;
  created_at?: string;
}

export const getBlogs = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
  return data || [];
};

export const subscribeToNewsletter = async (email: string): Promise<{ error: any }> => {
  const { error } = await supabase
    .from('subscribers')
    .insert([{ email }]);
  return { error };
};