import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;

// Vercel's Supabase integration provides SUPABASE_ANON_KEY;
// Replit secrets use SUPABASE_PUBLISHABLE_KEY — support both.
const SUPABASE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    '[Supabase] Missing credentials — set SUPABASE_URL and either SUPABASE_PUBLISHABLE_KEY (Replit) or SUPABASE_ANON_KEY (Vercel) as environment variables. Forms will not submit until this is fixed.'
  );
}

export const supabase = createClient(
  SUPABASE_URL ?? '',
  SUPABASE_KEY ?? '',
  { db: { schema: 'public' } }
);
