import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Share,
  Alert,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParams } from '../navigation';
import { useAuth } from '../context/AuthContext';

type Props = NativeStackScreenProps<OnboardingStackParams, 'InviteLink'>;

export default function InviteLinkScreen({ navigation }: Props) {
  const { profile } = useAuth();

  const inviteLink = `oula.app/invite/${profile?.invite_code ?? '...'}`;

  const handleShare = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await Share.share({
        message: `Join me on Oula — the voice note app for close friends 🎙\n\nhttps://${inviteLink}`,
        url: `https://${inviteLink}`,
      });
    } catch (err: any) {
      if (err.message !== 'The user did not share') {
        Alert.alert('Error', 'Could not open share sheet.');
      }
    }
  };

  const handleGoToOula = () => {
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: 'Home' as any }],
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Top spacer */}
        <View style={styles.topSpacer} />

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>your oula link</Text>
          <Text style={styles.subtitle}>share this link to add someone to your oula</Text>

          {/* Link display */}
          <View style={styles.linkBox}>
            <Text style={styles.linkText}>{inviteLink}</Text>
          </View>

          {/* Share button */}
          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShare}
            activeOpacity={0.85}
          >
            <Text style={styles.shareButtonText}>Share my link</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleGoToOula}
            activeOpacity={0.7}
          >
            <Text style={styles.skipText}>Go to my Oula →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF9F7' },
  container: {
    flex: 1,
    paddingHorizontal: 28,
  },
  topSpacer: { flex: 1 },
  content: {
    flex: 2,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 28,
    color: '#1A1A1A',
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    color: '#8A8A8A',
    lineHeight: 24,
    marginBottom: 32,
  },
  linkBox: {
    backgroundColor: '#F0EFED',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 20,
  },
  linkText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 15,
    color: '#1A1A1A',
    letterSpacing: 0.1,
  },
  shareButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
    alignItems: 'center',
  },
  skipButton: {
    padding: 12,
  },
  skipText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 15,
    color: '#8A8A8A',
  },
});
