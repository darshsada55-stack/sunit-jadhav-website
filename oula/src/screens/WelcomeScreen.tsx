import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParams } from '../navigation';

type Props = NativeStackScreenProps<OnboardingStackParams, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF9F7" />
      <View style={styles.container}>
        {/* Top padding spacer */}
        <View style={styles.topSpacer} />

        {/* Logo & tagline */}
        <View style={styles.hero}>
          <Text style={styles.logo}>oula</Text>
          <Text style={styles.tagline}>stay close to the people you love</Text>
        </View>

        {/* Bottom CTA */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('CreateProfile', {})}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FAF9F7',
  },
  container: {
    flex: 1,
    paddingHorizontal: 32,
  },
  topSpacer: {
    flex: 1,
  },
  hero: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logo: {
    fontFamily: 'DM_Sans_700Bold',
    fontSize: 52,
    color: '#1A1A1A',
    letterSpacing: -1.5,
    marginBottom: 16,
  },
  tagline: {
    fontFamily: 'DM_Sans_400Regular',
    fontSize: 18,
    color: '#6B6B6B',
    lineHeight: 26,
    maxWidth: 220,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  button: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'DM_Sans_500Medium',
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});
