import { createBrowserClient } from '@supabase/ssr';
import { supabaseConfig, validateConfig } from './config';

/**
 * Singleton Supabase Client for use in Browser/Client Components.
 */
let client: ReturnType<typeof createBrowserClient>;

export const createClient = () => {
  const { ok, error } = validateConfig();
  if (!ok && typeof window !== 'undefined') {
    throw new Error(error);
  }

  if (!client) {
    client = createBrowserClient(supabaseConfig.url, supabaseConfig.anonKey);
  }

  return client;
};

// Default instance for easy import
export const supabase = typeof window !== 'undefined' ? createClient() : null;
