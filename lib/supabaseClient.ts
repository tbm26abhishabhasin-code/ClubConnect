
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://yyvbajgrgnzehixcczat.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5dmJhamdyZ256ZWhpeGNjemF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MDEyNzMsImV4cCI6MjA4MDI3NzI3M30.FNC5pnClxzYW_HHnORiidSc8Rigj5Dl1I_zVVLjg0s8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
