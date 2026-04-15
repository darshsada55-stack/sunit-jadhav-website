import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';

import { useAuth } from '../context/AuthContext';
import WelcomeScreen from '../screens/WelcomeScreen';
import CreateProfileScreen from '../screens/CreateProfileScreen';
import InviteLinkScreen from '../screens/InviteLinkScreen';
import HomeScreen from '../screens/HomeScreen';
import VoiceChatScreen from '../screens/VoiceChatScreen';
import ProfileScreen from '../screens/ProfileScreen';

// ── Param lists ────────────────────────────────────────────────────────────

export type OnboardingStackParams = {
  Welcome: undefined;
  CreateProfile: { pendingInviteCode?: string };
  InviteLink: undefined;
};

export type MainStackParams = {
  Home: { pendingInviteCode?: string };
  VoiceChat: {
    userId: string;
    userName: string;
    userAvatarUrl: string | null;
  };
  Profile: undefined;
};

const OnboardingStack = createNativeStackNavigator<OnboardingStackParams>();
const MainStack = createNativeStackNavigator<MainStackParams>();

// ── Deep link config ───────────────────────────────────────────────────────

const linking = {
  prefixes: [
    Linking.createURL('/'),
    'oula://',
    'https://oula.app',
  ],
  config: {
    screens: {
      // Onboarding
      Welcome: 'welcome',
      CreateProfile: {
        path: 'invite/:pendingInviteCode',
      },
      // Main
      Home: {
        path: 'home',
        screens: {},
      },
    },
  },
};

// ── Navigators ─────────────────────────────────────────────────────────────

const screenOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: '#FAF9F7' },
  animation: 'slide_from_right' as const,
};

function OnboardingNavigator() {
  return (
    <OnboardingStack.Navigator screenOptions={screenOptions}>
      <OnboardingStack.Screen name="Welcome" component={WelcomeScreen} />
      <OnboardingStack.Screen name="CreateProfile" component={CreateProfileScreen} />
      <OnboardingStack.Screen name="InviteLink" component={InviteLinkScreen} />
    </OnboardingStack.Navigator>
  );
}

function MainNavigator() {
  return (
    <MainStack.Navigator screenOptions={screenOptions}>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen
        name="VoiceChat"
        component={VoiceChatScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
      <MainStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </MainStack.Navigator>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────

export default function RootNavigator() {
  const { profile, loading } = useAuth();

  if (loading) return null;

  return (
    <NavigationContainer linking={linking}>
      {profile ? <MainNavigator /> : <OnboardingNavigator />}
    </NavigationContainer>
  );
}
