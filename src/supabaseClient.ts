import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rbdsiqrgmcnvcsgpazjm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiZHNpcXJnbWNudmNzZ3BhemptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzODE2NzIsImV4cCI6MjA3NTk1NzY3Mn0.Y-nI_gn-QacT8BECYoMpZkCA6DKQQhG1ujKiTW2pwv4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);