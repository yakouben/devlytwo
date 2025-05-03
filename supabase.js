const supabaseUrl = 'https://rtzwliszlyhtxgwknycs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0endsaXN6bHlodHhnd2tueWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxOTk1MjQsImV4cCI6MjA2MTc3NTUyNH0.o1SjXTpyzWqu1damnHC9teb6PnNVPBbSbTGNwTLFKh4';

// Initialize Supabase client using the global object
const _supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Export the initialized client
export const supabase = _supabase; 