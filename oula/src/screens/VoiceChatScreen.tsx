import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParams } from '../navigation';
import { useAuth } from '../context/AuthContext';
import { supabase, VoiceNote, uploadFile } from '../lib/supabase';
import { sendVoiceNoteNotification } from '../lib/notifications';
import Avatar from '../components/Avatar';
import VoiceNoteItem from '../components/VoiceNoteItem';
import RecordButton from '../components/RecordButton';

type Props = NativeStackScreenProps<MainStackParams, 'VoiceChat'>;

export default function VoiceChatScreen({ navigation, route }: Props) {
  const { userId, userName, userAvatarUrl } = route.params;
  const { profile } = useAuth();

  const [notes, setNotes] = useState<VoiceNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [uploading, setUploading] = useState(false);

  const flatListRef = useRef<FlatList>(null);
  const durationTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const autoPlayIndexRef = useRef(0);

  // ── Fetch notes ────────────────────────────────────────────────────────

  const fetchNotes = useCallback(async () => {
    if (!profile) return;
    const { data, error } = await supabase
      .from('voice_notes')
      .select('*')
      .or(
        `and(sender_id.eq.${profile.id},recipient_id.eq.${userId}),and(sender_id.eq.${userId},recipient_id.eq.${profile.id})`,
      )
      .order('created_at', { ascending: true });

    if (error) {
      console.error('fetchNotes error:', error);
      return;
    }
    setNotes((data ?? []) as VoiceNote[]);
    setLoading(false);
  }, [profile, userId]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // ── Realtime ───────────────────────────────────────────────────────────

  useEffect(() => {
    if (!profile) return;
    const channel = supabase
      .channel(`chat_${profile.id}_${userId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'voice_notes' },
        (payload) => {
          const note = payload.new as VoiceNote;
          if (
            (note.sender_id === profile.id && note.recipient_id === userId) ||
            (note.sender_id === userId && note.recipient_id === profile.id)
          ) {
            setNotes((prev) => [...prev, note]);
          }
        },
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [profile, userId]);

  // ── Auto-play incoming notes ──────────────────────────────────────────

  const playNote = useCallback(
    async (note: VoiceNote) => {
      if (!profile || note.play_count >= 1) return;

      try {
        // Switch to earpiece playback
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          playThroughEarpieceAndroid: true,
        });

        if (soundRef.current) {
          await soundRef.current.unloadAsync();
          soundRef.current = null;
        }

        const { sound } = await Audio.Sound.createAsync(
          { uri: note.audio_url },
          { shouldPlay: true },
        );
        soundRef.current = sound;

        // Mark as played
        await supabase
          .from('voice_notes')
          .update({ played: true, play_count: 1 })
          .eq('id', note.id);

        setNotes((prev) =>
          prev.map((n) =>
            n.id === note.id ? { ...n, played: true, play_count: 1 } : n,
          ),
        );

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
            soundRef.current = null;
          }
        });
      } catch (err) {
        console.warn('playNote error:', err);
      }
    },
    [profile],
  );

  // Auto-play all unplayed received notes when screen opens
  useEffect(() => {
    if (!notes.length || !profile) return;
    const unplayed = notes.filter(
      (n) => n.recipient_id === profile.id && !n.played,
    );
    if (!unplayed.length) return;

    let idx = 0;
    const playNext = async () => {
      if (idx >= unplayed.length) return;
      const note = unplayed[idx];
      idx++;
      await playNote(note);
      // Brief gap between notes
      setTimeout(playNext, 600);
    };
    playNext();
  }, [notes.length > 0, profile?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup sound on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  // ── Recording ──────────────────────────────────────────────────────────

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Microphone access needed',
          'Oula needs microphone access to record voice notes. Please enable it in Settings.',
        );
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: rec } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );

      setRecording(rec);
      setIsRecording(true);
      setRecordingDuration(0);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      durationTimer.current = setInterval(() => {
        setRecordingDuration((d) => d + 1);
      }, 1000);
    } catch (err) {
      console.error('startRecording error:', err);
      Alert.alert('Error', 'Could not start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    if (!recording || !profile) return;

    try {
      if (durationTimer.current) {
        clearInterval(durationTimer.current);
        durationTimer.current = null;
      }

      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      if (!uri) return;
      if (recordingDuration < 1) {
        // Too short — discard
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        return;
      }

      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setUploading(true);

      const path = `audio/${profile.id}/${Date.now()}.m4a`;
      const storagePath = await uploadFile(uri, path, 'audio/m4a');

      if (!storagePath) {
        Alert.alert('Upload failed', 'Could not send voice note. Please try again.');
        setUploading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from('voice-notes')
        .getPublicUrl(storagePath);

      const { data: noteData, error } = await supabase
        .from('voice_notes')
        .insert({
          sender_id: profile.id,
          recipient_id: userId,
          audio_url: urlData.publicUrl,
          duration: recordingDuration,
        })
        .select()
        .single();

      if (error) {
        console.error('insert note error:', error);
        Alert.alert('Error', 'Could not save voice note.');
      } else {
        setNotes((prev) => [...prev, noteData as VoiceNote]);
        // Send push notification to recipient
        const { data: recipientData } = await supabase
          .from('users')
          .select('expo_push_token')
          .eq('id', userId)
          .maybeSingle();
        if (recipientData?.expo_push_token) {
          sendVoiceNoteNotification(recipientData.expo_push_token);
        }
      }

      setUploading(false);
    } catch (err) {
      console.error('stopRecording error:', err);
      setUploading(false);
    }
  };

  const handleReplay = async (note: VoiceNote) => {
    if (note.play_count >= 1 && note.recipient_id === profile?.id) return;
    await playNote(note);
  };

  // Scroll to bottom when notes change
  useEffect(() => {
    if (notes.length > 0) {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [notes.length]);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerPerson}>
          <Avatar name={userName} avatarUrl={userAvatarUrl} size={40} />
          <Text style={styles.headerName}>{userName.split(' ')[0]}</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {/* Notes list */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color="#1A1A1A" />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <VoiceNoteItem
              note={item}
              isSentByMe={item.sender_id === profile?.id}
              onReplay={() => handleReplay(item)}
            />
          )}
          contentContainerStyle={styles.notesList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyChat}>
              <Text style={styles.emptyChatText}>
                hold the button to record your first note
              </Text>
            </View>
          }
        />
      )}

      {/* Record button area */}
      <View style={styles.recordArea}>
        {uploading && (
          <View style={styles.uploadingRow}>
            <ActivityIndicator size="small" color="#8A8A8A" />
            <Text style={styles.uploadingText}>sending...</Text>
          </View>
        )}
        {isRecording && (
          <Text style={styles.durationTimer}>
            {formatDuration(recordingDuration)}
          </Text>
        )}
        <RecordButton
          isRecording={isRecording}
          onPressIn={startRecording}
          onPressOut={stopRecording}
          disabled={uploading}
        />
        <Text style={styles.holdHint}>
          {isRecording ? 'release to send' : 'hold to record'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const formatDuration = (secs: number): string => {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF9F7' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EFED',
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontFamily: 'DM_Sans_400Regular',
    fontSize: 22,
    color: '#1A1A1A',
  },
  headerPerson: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  headerName: {
    fontFamily: 'DM_Sans_500Medium',
    fontSize: 15,
    color: '#1A1A1A',
  },
  headerSpacer: { width: 36 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notesList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexGrow: 1,
    gap: 10,
  },
  emptyChat: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyChatText: {
    fontFamily: 'DM_Sans_400Regular',
    fontSize: 14,
    color: '#BDBDBD',
    textAlign: 'center',
    maxWidth: 200,
    lineHeight: 22,
  },
  recordArea: {
    alignItems: 'center',
    paddingBottom: 32,
    paddingTop: 16,
    gap: 10,
  },
  uploadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  uploadingText: {
    fontFamily: 'DM_Sans_400Regular',
    fontSize: 13,
    color: '#8A8A8A',
  },
  durationTimer: {
    fontFamily: 'DM_Sans_500Medium',
    fontSize: 16,
    color: '#E05050',
    letterSpacing: 1,
  },
  holdHint: {
    fontFamily: 'DM_Sans_400Regular',
    fontSize: 12,
    color: '#BDBDBD',
    marginTop: 4,
  },
});
