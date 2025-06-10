import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vgpyigvimdyctibdjswg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZncHlpZ3ZpbWR5Y3RpYmRqc3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2NDE4OTAsImV4cCI6MjA2MjIxNzg5MH0.KHVIliuTuFpFT5C8z6GEA9lsUzdwtnyYwZGSTwDbRlM";
export const supabase = createClient(supabaseUrl, supabaseKey);