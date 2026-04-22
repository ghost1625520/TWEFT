/**
 * Supabase Configuration & Environment Validation
 */

export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
};

// Runtime validation to prevent silent failures
export const validateConfig = () => {
  const missing = [];
  if (!supabaseConfig.url) missing.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!supabaseConfig.anonKey) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');

  if (missing.length > 0) {
    const errorMsg = `[Supabase Config Error] Missing Environment Variables: ${missing.join(', ')}`;
    console.error(errorMsg);
    if (typeof window !== 'undefined') {
      // For browser side detection
      console.warn('⚠️ Environment variables are missing. Please check your .env.local or Vercel dashboard.');
    }
    return { ok: false, error: errorMsg };
  }

  // Check for common URL misconfiguration (adding /rest/v1/)
  if (supabaseConfig.url.includes('/rest/v1')) {
    const errorMsg = `[Supabase Config Error] NEXT_PUBLIC_SUPABASE_URL should NOT include '/rest/v1/'. Please use the project root URL.`;
    console.error(errorMsg);
    return { ok: false, error: errorMsg };
  }

  return { ok: true };
};
