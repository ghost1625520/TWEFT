'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, UserProfile, UserRole } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateRole: (role: UserRole) => Promise<void>;
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

  const signInWithEmail = async (email: string, password: string) => {
    console.group('🔐 Supabase Auth Debug');
    console.log('Target Email:', email);
    
    if (!supabase) {
      console.error('Supabase client is not initialized. Please check your environment variables.');
      console.groupEnd();
      return { error: { message: '系統配置錯誤：Supabase 客戶端未初始化', status: 500 } };
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      console.error('Auth Error Details:', error);
      
      // Translate common errors
      let friendlyMessage = error.message;
      if (error.message.includes('Invalid login credentials')) {
        friendlyMessage = '帳號或密碼錯誤';
      } else if (error.message.includes('Email not confirmed')) {
        friendlyMessage = '電子郵件尚未驗證';
      } else if (error.message.includes('Database error querying schema')) {
        friendlyMessage = '資料庫連線異常 (Schema Error)，請聯繫管理員重啟 Supabase 專案';
      }

      console.groupEnd();
      return { error: { ...error, message: friendlyMessage } };
    }

    console.log('Auth Success! User ID:', data.user?.id);
    console.groupEnd();
    return { error: null };
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

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInWithGoogle, signInWithEmail, signOut, updateRole }}>
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
