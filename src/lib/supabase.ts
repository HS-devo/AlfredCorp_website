import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://njpzomwpqzlhrinbisvb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qcHpvbXdwcXpsaHJpbmJpc3ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMjUwNTcsImV4cCI6MjA5NjgwMTA1N30.LO16420Zmfx-HWB2x0t4kZy2AUh1qQqnG_Gkt1QwehY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
