import 'react-native-url-polyfill/auto';
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import {
  DM_Sans_400Regular,
  DM_Sans_500Medium,
  DM_Sans_700Bold,
} from '@expo-google-fonts/dm-sans';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';

import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation';

// Keep splash visible until fonts + auth load
preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    DM_Sans_400Regular,
    DM_Sans_500Medium,
    DM_Sans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      setAppReady(true);
    }
  }, [fontsLoaded, fontError]);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await hideAsync();
    }
  }, [appReady]);

  // Set up notification listeners
  useEffect(() => {
    const responseSub = Notifications.addNotificationResponseReceivedListener(
      (_response) => {
        // Could deep link to relevant screen here in v2
      },
    );
    return () => responseSub.remove();
  }, []);

  if (!appReady) return null;

  return (
    <View style={styles.root} onLayout={onLayoutRootView}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FAF9F7',
  },
});
