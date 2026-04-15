import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// ── Types ──────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  auth_id: string;
  name: string;
  email: string | null;
  avatar_url: string | null;
  invite_code: string;
  expo_push_token: string | null;
  created_at: string;
}

export interface Connection {
  id: string;
  user_id: string;
  connected_user_id: string;
  created_at: string;
  connected_user?: UserProfile;
}

export interface VoiceNote {
  id: string;
  sender_id: string;
  recipient_id: string;
  audio_url: string;
  duration: number;
  played: boolean;
  play_count: number;
  created_at: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────

export const generateInviteCode = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};

export const getAvatarPublicUrl = (path: string): string => {
  const { data } = supabase.storage.from('voice-notes').getPublicUrl(path);
  return data.publicUrl;
};

export const uploadFile = async (
  uri: string,
  storagePath: string,
  contentType: string,
): Promise<string | null> => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const { data, error } = await supabase.storage
      .from('voice-notes')
      .upload(storagePath, blob, { contentType, upsert: true });
    if (error) throw error;
    return data.path;
  } catch (err) {
    console.error('uploadFile error:', err);
    return null;
  }
};
