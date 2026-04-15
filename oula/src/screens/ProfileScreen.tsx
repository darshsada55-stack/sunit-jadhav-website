import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Share,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParams } from '../navigation';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import Avatar from '../components/Avatar';

type Props = NativeStackScreenProps<MainStackParams, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const { profile, updateProfile, signOut } = useAuth();

  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(profile?.name ?? '');
  const [editEmail, setEditEmail] = useState(profile?.email ?? '');
  const [saving, setSaving] = useState(false);

  const inviteLink = `oula.app/invite/${profile?.invite_code ?? ''}`;

  const handleShare = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await Share.share({
      message: `Join me on Oula — voice notes for close friends 🎙\n\nhttps://${inviteLink}`,
      url: `https://${inviteLink}`,
    });
  };

  const handlePickAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Oula needs photo library access to update your photo.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (result.canceled || !result.assets[0]) return;

    const uri = result.assets[0].uri;
    const ext = uri.split('.').pop() ?? 'jpg';
    const path = `avatars/${profile?.id}.${ext}`;

    try {
      setSaving(true);
      const response = await fetch(uri);
      const blob = await response.blob();
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('voice-notes')
        .upload(path, blob, { contentType: `image/${ext}`, upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('voice-notes')
        .getPublicUrl(uploadData.path);

      await updateProfile({ avatar_url: urlData.publicUrl });
    } catch (err: any) {
      Alert.alert('Error', 'Could not update photo. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editName.trim()) {
      Alert.alert('Name required', 'Please enter a name.');
      return;
    }
    setSaving(true);
    try {
      await updateProfile({
        name: editName.trim(),
        email: editEmail.trim() || null,
      });
      setEditing(false);
    } catch (err: any) {
      Alert.alert('Error', err.message ?? 'Could not save changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign out',
        style: 'destructive',
        onPress: async () => {
          await signOut();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>profile</Text>
          <TouchableOpacity
            onPress={() => {
              if (editing) {
                handleSaveEdit();
              } else {
                setEditName(profile?.name ?? '');
                setEditEmail(profile?.email ?? '');
                setEditing(true);
              }
            }}
          >
            {saving ? (
              <ActivityIndicator size="small" color="#1A1A1A" />
            ) : (
              <Text style={styles.editToggle}>{editing ? 'save' : 'edit'}</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <TouchableOpacity
          style={styles.avatarSection}
          onPress={handlePickAvatar}
          activeOpacity={0.8}
        >
          <View style={styles.avatarWrapper}>
            <Avatar
              name={profile?.name ?? ''}
              avatarUrl={profile?.avatar_url ?? null}
              size={88}
            />
            <View style={styles.avatarEditBadge}>
              <Text style={styles.avatarEditIcon}>✎</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Name & email */}
        {editing ? (
          <View style={styles.editForm}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>name</Text>
              <TextInput
                style={styles.input}
                value={editName}
                onChangeText={setEditName}
                placeholder="Your name"
                placeholderTextColor="#BDBDBD"
                autoCapitalize="words"
              />
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>email</Text>
              <TextInput
                style={styles.input}
                value={editEmail}
                onChangeText={setEditEmail}
                placeholder="you@example.com"
                placeholderTextColor="#BDBDBD"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
        ) : (
          <View style={styles.infoSection}>
            <Text style={styles.displayName}>{profile?.name}</Text>
            {profile?.email ? (
              <Text style={styles.displayEmail}>{profile.email}</Text>
            ) : null}
          </View>
        )}

        {/* Divider */}
        <View style={styles.divider} />

        {/* Invite link */}
        <View style={styles.inviteSection}>
          <Text style={styles.sectionLabel}>your oula link</Text>
          <View style={styles.linkRow}>
            <Text style={styles.linkText} numberOfLines={1}>
              {inviteLink}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShare}
            activeOpacity={0.85}
          >
            <Text style={styles.shareButtonText}>Share link</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Sign out */}
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
          activeOpacity={0.7}
        >
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF9F7' },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 24,
  },
  backArrow: {
    fontFamily: 'DM_Sans_400Regular',
    fontSize: 22,
    color: '#1A1A1A',
  },
  topBarTitle: {
    fontFamily: 'DM_Sans_500Medium',
    fontSize: 16,
    color: '#1A1A1A',
  },
  editToggle: {
    fontFamily: 'DM_Sans_400Regular',
    fontSize: 15,
    color: '#8A8A8A',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarEditBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FAF9F7',
  },
  avatarEditIcon: {
    color: '#FFF',
    fontSize: 12,
  },
  infoSection: {
    alignItems: 'center',
    marginBottom: 32,
    gap: 4,
  },
  displayName: {
    fontFamily: 'DM_Sans_700Bold',
    fontSize: 22,
    color: '#1A1A1A',
    letterSpacing: -0.3,
  },
  displayEmail: {
    fontFamily: 'DM_Sans_400Regular',
    fontSize: 14,
    color: '#8A8A8A',
  },
  editForm: {
    gap: 16,
    marginBottom: 32,
  },
  fieldGroup: { gap: 6 },
  fieldLabel: {
    fontFamily: 'DM_Sans_500Medium',
    fontSize: 12,
    color: '#8A8A8A',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
  divider: {
    height: 1,
    backgroundColor: '#F0EFED',
    marginVertical: 24,
  },
  sectionLabel: {
    fontFamily: 'DM_Sans_500Medium',
    fontSize: 12,
    color: '#8A8A8A',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  inviteSection: {
    gap: 12,
  },
  linkRow: {
    backgroundColor: '#F0EFED',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  linkText: {
    fontFamily: 'DM_Sans_400Regular',
    fontSize: 14,
    color: '#1A1A1A',
  },
  shareButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    fontFamily: 'DM_Sans_500Medium',
    fontSize: 15,
    color: '#FFFFFF',
  },
  signOutButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  signOutText: {
    fontFamily: 'DM_Sans_400Regular',
    fontSize: 15,
    color: '#E05050',
  },
});
