import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = 
  | 'Guest' 
  | 'Member' 
  | 'Professional' 
  | 'Certified' 
  | 'Instructor' 
  | 'Editor' 
  | 'Staff' 
  | 'Admin';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  full_name?: string;
  avatar_url?: string;
  permissions: string[];
  membership_status?: string;
}

export interface SitePage {
  id: string;
  slug: string;
  title: string;
  seo_description?: string;
}

export interface SiteModule {
  id: string;
  page_id: string;
  type: string;
  title?: string;
  subtitle?: string;
  content?: string;
  items?: any;
  image_url?: string;
  order_index: number;
}

export interface Course {
  id: string;
  title: string;
  category?: string;
  status: 'Active' | 'Draft' | 'Archived';
  price?: string;
  syllabus?: any;
}

export interface NewsItem {
  id: string;
  title: string;
  content?: string;
  category?: string;
  publish_date: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  category?: string;
  file_url?: string;
  description?: string;
}
