import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';

interface RecordButtonProps {
  isRecording: boolean;
  onPressIn: () => void;
  onPressOut: () => void;
  disabled?: boolean;
}

export default function RecordButton({
  isRecording,
  onPressIn,
  onPressOut,
  disabled = false,
}: RecordButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const ringOpacity = useRef(new Animated.Value(0)).current;
  const ringScale = useRef(new Animated.Value(0.8)).current;
  const pulseLoop = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (isRecording) {
      // Animate button to record state
      Animated.spring(scaleAnim, {
        toValue: 1.08,
        useNativeDriver: true,
        friction: 5,
      }).start();

      // Pulsing ring
      pulseLoop.current = Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(ringOpacity, {
              toValue: 0.4,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(ringScale, {
              toValue: 1.5,
              duration: 700,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(ringOpacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(ringScale, {
              toValue: 0.8,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
        ]),
      );
      pulseLoop.current.start();
    } else {
      // Return to idle
      pulseLoop.current?.stop();
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          friction: 6,
        }),
        Animated.timing(ringOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(ringScale, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }

    return () => {
      pulseLoop.current?.stop();
    };
  }, [isRecording, scaleAnim, ringOpacity, ringScale]);

  const buttonColor = isRecording ? '#E05050' : '#1A1A1A';

  return (
    <View style={styles.container}>
      {/* Pulsing ring (only visible while recording) */}
      <Animated.View
        style={[
          styles.ring,
          {
            opacity: ringOpacity,
            transform: [{ scale: ringScale }],
            borderColor: '#E05050',
          },
        ]}
      />

      {/* Main button */}
      <Animated.View
        style={[
          styles.buttonOuter,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <TouchableOpacity
          onPressIn={disabled ? undefined : onPressIn}
          onPressOut={disabled ? undefined : onPressOut}
          activeOpacity={1}
          disabled={disabled}
          style={[
            styles.button,
            { backgroundColor: buttonColor },
            disabled && styles.buttonDisabled,
          ]}
        >
          {/* Mic icon — simple dot/oval shape */}
          <View style={styles.micIcon}>
            <View style={styles.micBody} />
            <View style={styles.micBase} />
            <View style={styles.micStand} />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const BUTTON_SIZE = 72;

const styles = StyleSheet.create({
  container: {
    width: BUTTON_SIZE + 40,
    height: BUTTON_SIZE + 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    width: BUTTON_SIZE + 32,
    height: BUTTON_SIZE + 32,
    borderRadius: (BUTTON_SIZE + 32) / 2,
    borderWidth: 2,
  },
  buttonOuter: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  // Simple mic icon built from Views
  micIcon: {
    alignItems: 'center',
    gap: 3,
  },
  micBody: {
    width: 14,
    height: 22,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
  },
  micBase: {
    width: 22,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#FFFFFF',
  },
  micStand: {
    width: 2,
    height: 6,
    borderRadius: 1,
    backgroundColor: '#FFFFFF',
    marginTop: -1,
  },
});
