import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { useFonts } from 'expo-font';
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';

import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation';

enableScreens();

// Prevent flash — hide as soon as the JS bundle mounts
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  // Load fonts in the background — app renders immediately regardless
  useFonts({ DMSans_400Regular, DMSans_500Medium, DMSans_700Bold });

  useEffect(() => {
    // Hide splash screen right away; fonts apply once loaded without blocking
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener(() => {});
    return () => sub.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FAF9F7' },
});
