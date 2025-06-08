import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createClient, User } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!,
);

// Type definition for the authentication context
type AuthContextType = {
  user: User | null; // Currently authenticated user, or null if not logged in
  loading: boolean; // Loading state for auth operations
  signIn: (email: string, password: string) => Promise<void>; // Sign in function
  signUp: (email: string, password: string) => Promise<void>; // Sign up function
  signOut: () => Promise<void>; // Sign out function
  error: string | null; // Error message, if any
};

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component to wrap the app and provide auth state/functions
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // State for current user
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error messages

  // On mount, check for existing session and subscribe to auth state changes
  useEffect(() => {
    // Get current session (if any) on initial load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  // Sign up a new user with email and password
  const signUp = async (email: string, password: string) => {
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      throw error;
    }
  };

  // Sign in an existing user with email and password
  const signIn = async (email: string, password: string) => {
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      throw error;
    }
  };

  // Sign out the current user
  const signOut = async () => {
    setError(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error.message);
      throw error;
    }
  };

  // Provide auth state and functions to children components
  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
