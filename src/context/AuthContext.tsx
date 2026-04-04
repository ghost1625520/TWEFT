'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, UserProfile, UserRole } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateRole: (role: UserRole) => Promise<void>;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const setData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      }
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    setData();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code === 'PGRST116') {
      // Profile doesn't exist, create a default one
      const { data: newUser } = await supabase.auth.getUser();
      if (newUser.user) {
        const newProfile: UserProfile = {
          id: userId,
          email: newUser.user.email!,
          role: 'Guest',
          full_name: newUser.user.user_metadata.full_name,
          avatar_url: newUser.user.user_metadata.avatar_url,
          permissions: ['view_cms'],
        };
        const { data: createdProfile } = await supabase
          .from('profiles')
          .insert([newProfile])
          .select()
          .single();
        setProfile(createdProfile);
      }
    } else {
      setProfile(data);
    }
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/portal/dashboard',
      },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateRole = async (role: UserRole) => {
    if (!user) return;
    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', user.id);
    
    if (!error) {
      setProfile(prev => prev ? { ...prev, role } : null);
    }
  };

  const hasPermission = (permission: string) => {
    if (profile?.role === 'Admin') return true; // Admins have all permissions
    return profile?.permissions?.includes(permission) ?? false;
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInWithGoogle, signOut, updateRole, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
