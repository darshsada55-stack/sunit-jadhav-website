import 'react-native-url-polyfill/auto';
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { useFonts } from 'expo-font';
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';

import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation';

// Must be called before any navigation renders
enableScreens();

// Keep splash visible until fonts + auth load
preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
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

  useEffect(() => {
    const responseSub = Notifications.addNotificationResponseReceivedListener(
      (_response) => {},
    );
    return () => responseSub.remove();
  }, []);

  if (!appReady) return null;

  return (
    <SafeAreaProvider>
      <View style={styles.root} onLayout={onLayoutRootView}>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FAF9F7',
  },
});
