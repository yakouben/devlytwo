import { supabase } from './supabase.js';

// Sign Up
export async function signUp(email, password, userType, fullName) {
  try {
    // 1. Sign up with Supabase Auth
    const { data: { user }, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          user_type: userType
        }
      }
    });

    if (authError) throw authError;

    // 2. Create user profile in users table
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: user.id,
        email: email,
        full_name: fullName,
        user_type: userType,
        created_at: new Date(),
        last_login: new Date()
      });

    if (profileError) throw profileError;

    // 3. Create specific profile based on user type
    if (userType === 'seeker') {
      const { error: seekerError } = await supabase
        .from('seeker_profiles')
        .insert({
          id: crypto.randomUUID(), // Generate UUID for the profile
          user_id: user.id,
          is_available: true,
          updated_at: new Date()
        });

      if (seekerError) throw seekerError;
    } else {
      const { error: companyError } = await supabase
        .from('company_profiles')
        .insert({
          id: crypto.randomUUID(), // Generate UUID for the profile
          user_id: user.id, 
          updated_at: new Date()
        });

      if (companyError) throw companyError;
    }

    return { user };
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Update last login
    await supabase
      .from('users')
      .update({ last_login: new Date() })
      .eq('id', user.id);

    return user;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// Sign Out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Check if user is logged in
export async function checkAuth() {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
        console.error('Error checking auth:', error);
        return null;
    }

    return session?.user || null;
}

// Check user type and redirect if needed
export async function checkUserTypeAndRedirect(expectedType) {
    const user = await checkAuth();
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }

    const { data: userData, error } = await supabase
        .from('users')
        .select('user_type')
        .eq('id', user.id)
        .single();

    if (error) {
        console.error('Error getting user type:', error);
        return null;
    }

    if (userData.user_type !== expectedType) {
        window.location.href = 'login.html';
        return null;
    }

    return user;
} 