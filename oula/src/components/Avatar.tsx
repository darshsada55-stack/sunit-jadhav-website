import React, { useMemo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ViewStyle,
} from 'react-native';

// Soft pastel palette — deterministically assigned per user name
const PASTEL_COLORS = [
  '#FFB5A7', // soft coral
  '#FEC89A', // peach
  '#FFD7BA', // light apricot
  '#B5EAD7', // mint
  '#C7CEEA', // periwinkle
  '#E2D4F0', // lavender
  '#FFDDD2', // blush
  '#D4E9C7', // sage
  '#FAE1DD', // rose
  '#BDE0FE', // sky blue
];

const getColorForName = (name: string): string => {
  if (!name || name.trim() === '') return PASTEL_COLORS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return PASTEL_COLORS[Math.abs(hash) % PASTEL_COLORS.length];
};

interface AvatarProps {
  name: string;
  avatarUrl: string | null | undefined;
  size?: number;
  style?: ViewStyle;
}

export default function Avatar({ name, avatarUrl, size = 48, style }: AvatarProps) {
  const initial = useMemo(
    () => (name?.trim()?.[0]?.toUpperCase() ?? '?'),
    [name],
  );
  const bgColor = useMemo(() => getColorForName(name), [name]);
  const fontSize = Math.round(size * 0.38);
  const borderRadius = size / 2;

  if (avatarUrl) {
    return (
      <Image
        source={{ uri: avatarUrl }}
        style={[
          styles.image,
          { width: size, height: size, borderRadius },
          style,
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.placeholder,
        { width: size, height: size, borderRadius, backgroundColor: bgColor },
        style,
      ]}
    >
      <Text style={[styles.initial, { fontSize, lineHeight: size }]}>
        {initial}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    fontFamily: 'DMSans_500Medium',
    color: '#1A1A1A',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
