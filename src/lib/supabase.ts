import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  console.error(
    '[Supabase] Missing credentials — set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY as environment variables on your host (Vercel / Replit). Forms will not submit until this is fixed.'
  );
}

export const supabase = createClient(
  SUPABASE_URL ?? '',
  SUPABASE_PUBLISHABLE_KEY ?? '',
  { db: { schema: 'public' } }
);
