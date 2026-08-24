import { createClient } from '@supabase/supabase-js';

// Coloque a URL e a Anon Key do mesmo Supabase onde você rodou o script do site_config
const SUPABASE_URL = 'https://SEU_PROJETO.supabase.co';
const SUPABASE_ANON_KEY = 'SUA_ANON_KEY_AQUI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);