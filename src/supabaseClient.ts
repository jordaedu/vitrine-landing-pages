import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ablwsvjvmihqtbyvzjjl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFibHdzdmp2bWlocXRieXZ6ampsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMzgzMDEsImV4cCI6MjEwMjkxNDMwMX0.mpcIviropLBxf8tbisN2dcEfpMhSI-WZ3ChQrIGEtOU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);