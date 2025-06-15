// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database

const SUPABASE_URL = 'https://gusjsjowebsrocsamcyu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1c2pzam93ZWJzcm9jc2FtY3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MTYzNzksImV4cCI6MjA2NDk5MjM3OX0.dHsyctJfzWBe-Atx9NjWbc6YwET-d0TTgJfQyT-VAoM';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
