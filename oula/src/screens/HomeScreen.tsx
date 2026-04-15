import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Share,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import * as Linking from 'expo-linking';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParams } from '../navigation';
import { useAuth } from '../context/AuthContext';
import { supabase, UserProfile, VoiceNote } from '../lib/supabase';
import Avatar from '../components/Avatar';

type Props = NativeStackScreenProps<MainStackParams, 'Home'>;

interface ConnectionEntry {
  user: UserProfile;
  hasUnread: boolean;
}

export default function HomeScreen({ navigation, route }: Props) {
  const { profile } = useAuth();
  const [connections, setConnections] = useState<ConnectionEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConnections = useCallback(async () => {
    if (!profile) return;

    // Get all connection rows where current user is either side
    const { data: rows, error } = await supabase
      .from('connections')
      .select('*, connected_user:connected_user_id(*), user:user_id(*)')
      .or(`user_id.eq.${profile.id},connected_user_id.eq.${profile.id}`);

    if (error) {
      console.error('fetchConnections error:', error);
      return;
    }

    // Deduplicate and extract the "other" user from each row
    const seen = new Set<string>();
    const peers: UserProfile[] = [];
    for (const row of rows ?? []) {
      const peer: UserProfile =
        row.user_id === profile.id ? row.connected_user : row.user;
      if (peer && !seen.has(peer.id)) {
        seen.add(peer.id);
        peers.push(peer);
      }
    }

    // Check for unread notes for each peer
    const entries: ConnectionEntry[] = await Promise.all(
      peers.map(async (peer) => {
        const { data: unread } = await supabase
          .from('voice_notes')
          .select('id')
          .eq('sender_id', peer.id)
          .eq('recipient_id', profile.id)
          .eq('played', false)
          .limit(1);
        return { user: peer, hasUnread: (unread?.length ?? 0) > 0 };
      }),
    );

    setConnections(entries);
    setLoading(false);
  }, [profile]);

  // Handle pending invite from deep link
  const handlePendingInvite = useCallback(async (inviteCode: string) => {
    if (!profile) return;
    const { data: inviter } = await supabase
      .from('users')
      .select('*')
      .eq('invite_code', inviteCode)
      .neq('id', profile.id)
      .maybeSingle();

    if (!inviter) return;

    // Create bidirectional connection
    await supabase.from('connections').upsert([
      { user_id: profile.id, connected_user_id: inviter.id },
      { user_id: inviter.id, connected_user_id: profile.id },
    ]);

    await fetchConnections();
    Alert.alert(
      'Connected!',
      `You and ${inviter.name} are now connected on Oula.`,
      [
        {
          text: 'Send a note',
          onPress: () =>
            navigation.navigate('VoiceChat', {
              userId: inviter.id,
              userName: inviter.name,
              userAvatarUrl: inviter.avatar_url,
            }),
        },
        { text: 'Maybe later', style: 'cancel' },
      ],
    );
  }, [profile, fetchConnections, navigation]);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  // Check for pending invite code from deep link
  useEffect(() => {
    const code = route.params?.pendingInviteCode;
    if (code) handlePendingInvite(code);
  }, [route.params?.pendingInviteCode, handlePendingInvite]);

  // Realtime subscription for new voice notes
  useEffect(() => {
    if (!profile) return;
    const channel = supabase
      .channel('home_voice_notes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'voice_notes',
          filter: `recipient_id=eq.${profile.id}`,
        },
        () => fetchConnections(),
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [profile, fetchConnections]);

  const handleShare = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const link = `https://oula.app/invite/${profile?.invite_code}`;
    await Share.share({
      message: `Join me on Oula — voice notes for close friends 🎙\n\n${link}`,
      url: link,
    });
  };

  const renderConnection = ({ item }: { item: ConnectionEntry }) => (
    <TouchableOpacity
      style={styles.personItem}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.navigate('VoiceChat', {
          userId: item.user.id,
          userName: item.user.name,
          userAvatarUrl: item.user.avatar_url,
        });
      }}
      activeOpacity={0.8}
    >
      <View style={styles.avatarWrapper}>
        <Avatar name={item.user.name} avatarUrl={item.user.avatar_url} size={72} />
        {item.hasUnread && <View style={styles.unreadDot} />}
      </View>
      <Text style={styles.personName} numberOfLines={1}>
        {item.user.name.split(' ')[0]}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Nav bar */}
      <View style={styles.navbar}>
        <Text style={styles.navLogo}>oula</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Avatar
            name={profile?.name ?? ''}
            avatarUrl={profile?.avatar_url ?? null}
            size={32}
          />
        </TouchableOpacity>
      </View>

      {/* Body */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color="#1A1A1A" />
        </View>
      ) : connections.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>no one here yet</Text>
          <Text style={styles.emptySubtitle}>
            share your link to add someone
          </Text>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShare}
            activeOpacity={0.85}
          >
            <Text style={styles.shareButtonText}>Share my link</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={connections}
          keyExtractor={(item) => item.user.id}
          renderItem={renderConnection}
          numColumns={3}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF9F7' },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 16,
  },
  navLogo: {
    fontFamily: 'DM_Sans_700Bold',
    fontSize: 20,
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 8,
  },
  emptyTitle: {
    fontFamily: 'DM_Sans_500Medium',
    fontSize: 18,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontFamily: 'DM_Sans_400Regular',
    fontSize: 14,
    color: '#8A8A8A',
    textAlign: 'center',
    marginBottom: 28,
  },
  shareButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    paddingHorizontal: 28,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    fontFamily: 'DM_Sans_500Medium',
    fontSize: 15,
    color: '#FFFFFF',
  },
  grid: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 32,
  },
  personItem: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 28,
    maxWidth: '33.33%',
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1A1A1A',
    borderWidth: 2,
    borderColor: '#FAF9F7',
  },
  personName: {
    fontFamily: 'DM_Sans_400Regular',
    fontSize: 13,
    color: '#1A1A1A',
    textAlign: 'center',
  },
});
