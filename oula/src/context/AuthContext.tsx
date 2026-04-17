import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase, UserProfile } from '../lib/supabase';
import {
  registerForPushNotificationsAsync,
  savePushToken,
} from '../lib/notifications';

// ── Types ──────────────────────────────────────────────────────────────────

interface AuthContextValue {
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signInAnonymously: () => Promise<void>;
  createProfile: (data: {
    name: string;
    email: string | null;
    avatarUri: string | null;
  }) => Promise<UserProfile>;
  updateProfile: (updates: Partial<Pick<UserProfile, 'name' | 'email' | 'avatar_url'>>) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// ── Context ────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

// ── Provider ───────────────────────────────────────────────────────────────

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load profile for the current auth session
  const loadProfile = useCallback(async (authId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', authId)
      .maybeSingle();
    if (error) {
      console.error('loadProfile error:', error);
      return null;
    }
    return data as UserProfile | null;
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!session?.user?.id) return;
    const p = await loadProfile(session.user.id);
    setProfile(p);
  }, [session, loadProfile]);

  // Initialise: listen to auth state changes
  useEffect(() => {
    // Safety valve — if getSession hangs for any reason, unblock the UI
    const timeout = setTimeout(() => setLoading(false), 8000);

    supabase.auth.getSession()
      .then(async ({ data: { session: s } }) => {
        setSession(s);
        if (s?.user) {
          const p = await loadProfile(s.user.id);
          setProfile(p);
          if (p) {
            const token = await registerForPushNotificationsAsync();
            if (token && token !== p.expo_push_token) {
              await savePushToken(p.id, token);
            }
          }
        }
      })
      .catch((err) => console.warn('getSession error:', err))
      .finally(() => {
        clearTimeout(timeout);
        setLoading(false);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, s) => {
        setSession(s);
        if (s?.user) {
          const p = await loadProfile(s.user.id);
          setProfile(p);
        } else {
          setProfile(null);
        }
      },
    );

    return () => subscription.unsubscribe();
  }, [loadProfile]);

  // Sign in anonymously (Supabase anonymous auth must be enabled in dashboard)
  const signInAnonymously = async () => {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) throw error;
  };

  // Create user profile row in public.users after initial sign-in
  const createProfile = async ({
    name,
    email,
    avatarUri,
  }: {
    name: string;
    email: string | null;
    avatarUri: string | null;
  }): Promise<UserProfile> => {
    if (!session?.user) throw new Error('Not authenticated');

    // Upload avatar if provided
    let avatarUrl: string | null = null;
    if (avatarUri) {
      const ext = avatarUri.split('.').pop() ?? 'jpg';
      const path = `avatars/${session.user.id}.${ext}`;
      const response = await fetch(avatarUri);
      const blob = await response.blob();
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('voice-notes')
        .upload(path, blob, { contentType: `image/${ext}`, upsert: true });
      if (uploadError) console.warn('Avatar upload failed:', uploadError);
      else {
        const { data: urlData } = supabase.storage
          .from('voice-notes')
          .getPublicUrl(uploadData.path);
        avatarUrl = urlData.publicUrl;
      }
    }

    const inviteCode = generateInviteCode();

    const { data, error } = await supabase
      .from('users')
      .insert({
        auth_id: session.user.id,
        name: name.trim(),
        email: email?.trim() || null,
        avatar_url: avatarUrl,
        invite_code: inviteCode,
      })
      .select()
      .single();

    if (error) throw error;
    const newProfile = data as UserProfile;
    setProfile(newProfile);

    // Register push token
    const token = await registerForPushNotificationsAsync();
    if (token) await savePushToken(newProfile.id, token);

    return newProfile;
  };

  const updateProfile = async (
    updates: Partial<Pick<UserProfile, 'name' | 'email' | 'avatar_url'>>,
  ) => {
    if (!profile) return;
    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', profile.id);
    if (error) throw error;
    setProfile((p) => (p ? { ...p, ...updates } : p));
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        profile,
        loading,
        signInAnonymously,
        createProfile,
        updateProfile,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ── Util ───────────────────────────────────────────────────────────────────

const generateInviteCode = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};
