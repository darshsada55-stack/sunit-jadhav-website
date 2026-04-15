import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { supabase } from './supabase';

// Configure how notifications are shown when the app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const registerForPushNotificationsAsync = async (): Promise<string | null> => {
  let token: string | null = null;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('oula', {
      name: 'Oula',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#1A1A1A',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  const projectId = Constants.expoConfig?.extra?.eas?.projectId;
  try {
    const tokenData = await Notifications.getExpoPushTokenAsync({ projectId });
    token = tokenData.data;
  } catch (e) {
    console.warn('Could not get push token:', e);
  }

  return token;
};

export const savePushToken = async (userId: string, token: string): Promise<void> => {
  await supabase
    .from('users')
    .update({ expo_push_token: token })
    .eq('id', userId);
};

export const sendVoiceNoteNotification = async (recipientPushToken: string): Promise<void> => {
  try {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: recipientPushToken,
        title: 'oula',
        body: 'someone left you a note 🎙',
        sound: 'default',
        data: { type: 'voice_note' },
      }),
    });
  } catch (err) {
    console.warn('Failed to send push notification:', err);
  }
};
