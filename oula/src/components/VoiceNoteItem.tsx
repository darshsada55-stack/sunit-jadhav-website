import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { VoiceNote } from '../lib/supabase';

interface VoiceNoteItemProps {
  note: VoiceNote;
  isSentByMe: boolean;
  onReplay: () => void;
}

// Deterministic pseudo-random waveform heights based on note ID
const generateWaveform = (seed: string, count = 28): number[] => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  const bars: number[] = [];
  for (let i = 0; i < count; i++) {
    hash = ((hash << 5) - hash) + i * 31;
    hash |= 0;
    // Height between 0.15 and 1.0
    bars.push((Math.abs(hash) % 85) / 100 + 0.15);
  }
  return bars;
};

const formatDuration = (secs: number): string => {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export default function VoiceNoteItem({ note, isSentByMe, onReplay }: VoiceNoteItemProps) {
  const bars = useMemo(() => generateWaveform(note.id), [note.id]);

  const isExpired = note.recipient_id !== undefined && note.play_count >= 1 && !isSentByMe;
  const canReplay = !isExpired || isSentByMe;

  const barColor = isSentByMe
    ? (isExpired ? '#C4C4C4' : '#1A1A1A')
    : (isExpired ? '#D8D5D0' : '#8A8A8A');

  return (
    <View style={[styles.row, isSentByMe ? styles.rowRight : styles.rowLeft]}>
      <TouchableOpacity
        style={[
          styles.bubble,
          isSentByMe ? styles.bubbleSent : styles.bubbleReceived,
          isExpired && styles.bubbleExpired,
        ]}
        onPress={canReplay ? onReplay : undefined}
        activeOpacity={canReplay ? 0.75 : 1}
      >
        {isExpired && !isSentByMe ? (
          <View style={styles.expiredContent}>
            <Text style={styles.expiredText}>gone</Text>
            <Text style={styles.duration}>{formatDuration(note.duration)}</Text>
          </View>
        ) : (
          <View style={styles.noteContent}>
            {/* Waveform */}
            <View style={styles.waveform}>
              {bars.map((height, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.bar,
                    {
                      height: Math.max(3, height * 28),
                      backgroundColor: barColor,
                      opacity: note.played && !isSentByMe ? 0.45 : 1,
                    },
                  ]}
                />
              ))}
            </View>

            {/* Duration & state row */}
            <View style={styles.metaRow}>
              <Text
                style={[
                  styles.duration,
                  isSentByMe ? styles.durationSent : styles.durationReceived,
                ]}
              >
                {formatDuration(note.duration)}
              </Text>
              {note.played && !isSentByMe && (
                <Text style={styles.playedLabel}>played</Text>
              )}
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  rowRight: {
    justifyContent: 'flex-end',
  },
  rowLeft: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '72%',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  bubbleSent: {
    backgroundColor: '#1A1A1A',
    borderBottomRightRadius: 4,
  },
  bubbleReceived: {
    backgroundColor: '#F0EFED',
    borderBottomLeftRadius: 4,
  },
  bubbleExpired: {
    opacity: 0.6,
  },
  noteContent: {
    gap: 6,
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    height: 28,
  },
  bar: {
    width: 3,
    borderRadius: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  duration: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 11,
  },
  durationSent: {
    color: 'rgba(255,255,255,0.55)',
  },
  durationReceived: {
    color: '#BDBDBD',
  },
  playedLabel: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 10,
    color: '#BDBDBD',
    letterSpacing: 0.3,
  },
  expiredContent: {
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 2,
  },
  expiredText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: '#BDBDBD',
    fontStyle: 'italic',
  },
});
