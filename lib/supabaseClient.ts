import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://upgoourrhwfdfzeectna.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwZ29vdXJyaHdmZGZ6ZWVjdG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NDY5NjYsImV4cCI6MjA1NzUyMjk2Nn0.NirPI8Ar2iFJqGtRKDH1ffxV-nWDur82X4tGrm9OnOc'

export const supabase = createClient(supabaseUrl, supabaseKey);