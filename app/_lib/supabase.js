import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://odcloekjvtjhchznlmvk.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kY2xvZWtqdnRqaGNoem5sbXZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0ODI1MDUsImV4cCI6MjA1NDA1ODUwNX0.ZrmCrM1Y7g0yLQct3bcIfbCNIOMw2ED4ZxlFfbMCJJI';

export const supabase = createClient(supabaseUrl, supabaseKey);
