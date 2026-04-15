import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParams } from '../navigation';
import { useAuth } from '../context/AuthContext';
import Avatar from '../components/Avatar';

type Props = NativeStackScreenProps<OnboardingStackParams, 'CreateProfile'>;

export default function CreateProfileScreen({ navigation, route }: Props) {
  const { signInAnonymously, createProfile } = useAuth();
  const pendingInviteCode = route.params?.pendingInviteCode;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission needed',
        'Oula needs access to your photos to set a profile picture.',
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleContinue = async () => {
    if (!name.trim()) {
      Alert.alert('Missing name', 'Please enter your name to continue.');
      return;
    }

    setLoading(true);
    try {
      // Create anonymous Supabase session if not already authenticated
      await signInAnonymously();

      // Create profile
      await createProfile({
        name: name.trim(),
        email: email.trim() || null,
        avatarUri,
      });

      navigation.navigate('InviteLink');
    } catch (err: any) {
      console.error(err);
      Alert.alert('Something went wrong', err.message ?? 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const initial = name.trim()[0]?.toUpperCase() ?? '';

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>create your profile</Text>
            <Text style={styles.subtitle}>just the basics — you can change this anytime</Text>
          </View>

          {/* Avatar picker */}
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={pickAvatar}
            activeOpacity={0.8}
          >
            <Avatar
              name={name || ' '}
              avatarUrl={avatarUri}
              size={88}
              style={styles.avatarShadow}
            />
            <View style={styles.avatarEditBadge}>
              <Text style={styles.avatarEditText}>+</Text>
            </View>
          </TouchableOpacity>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>your name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="e.g. Maya"
                placeholderTextColor="#BDBDBD"
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="#BDBDBD"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
              />
              <Text style={styles.fieldHint}>only used if you lose access to your account</Text>
            </View>
          </View>

          {/* CTA */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleContinue}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Continue</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF9F7' },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 36,
  },
  title: {
    fontFamily: 'DM_Sans_700Bold',
    fontSize: 28,
    color: '#1A1A1A',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'DM_Sans_400Regular',
    fontSize: 14,
    color: '#8A8A8A',
    lineHeight: 20,
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 36,
    position: 'relative',
  },
  avatarShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarEditBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FAF9F7',
  },
  avatarEditText: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 18,
    fontFamily: 'DM_Sans_400Regular',
  },
  form: {
    marginBottom: 32,
    gap: 20,
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    fontFamily: 'DM_Sans_500Medium',
    fontSize: 12,
    color: '#8A8A8A',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  input: {
    fontFamily: 'DM_Sans_400Regular',
    fontSize: 16,
    color: '#1A1A1A',
    backgroundColor: '#F0EFED',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  fieldHint: {
    fontFamily: 'DM_Sans_400Regular',
    fontSize: 12,
    color: '#BDBDBD',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontFamily: 'DM_Sans_500Medium',
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});
