# oula — voice notes for close friends

A voice-note only messaging app built with React Native + Expo and Supabase.

## Tech Stack

- **React Native** with **Expo** (managed workflow, SDK 52)
- **Supabase** — auth (anonymous), database, audio storage
- **expo-av** — audio recording & playback
- **expo-notifications** — push notifications via Expo Push Service
- **React Navigation v6** — native stack navigator
- **DM Sans** — clean minimal typography

---

## Quick Start

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. In **SQL Editor**, run the full contents of `supabase/schema.sql`
3. In **Storage**, create a bucket named `voice-notes` and set it to **public**
4. In **Authentication → Providers**, enable **Anonymous sign-ins**
5. Copy your project URL and anon key

### 2. Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:
```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Install & Run

```bash
cd oula
npm install
npx expo start
```

Scan the QR code with **Expo Go** on your phone, or press `i`/`a` for iOS/Android simulator.

---

## Project Structure

```
oula/
├── App.tsx                    # Root: fonts, splash, providers
├── app.json                   # Expo config (scheme, permissions, plugins)
├── supabase/
│   └── schema.sql             # Full DB schema with RLS policies
└── src/
    ├── lib/
    │   ├── supabase.ts        # Supabase client + shared types
    │   └── notifications.ts  # Push token registration + send helper
    ├── context/
    │   └── AuthContext.tsx    # Auth state, profile CRUD, sign out
    ├── navigation/
    │   └── index.tsx          # Stack navigator + deep link config
    ├── screens/
    │   ├── WelcomeScreen.tsx
    │   ├── CreateProfileScreen.tsx
    │   ├── InviteLinkScreen.tsx
    │   ├── HomeScreen.tsx
    │   ├── VoiceChatScreen.tsx
    │   └── ProfileScreen.tsx
    └── components/
        ├── Avatar.tsx         # Circular avatar with pastel fallback initial
        ├── RecordButton.tsx   # Hold-to-record button with pulse animation
        └── VoiceNoteItem.tsx  # Waveform bubble (sent right / received left)
```

---

## Features

### Onboarding
- **Welcome** — minimal landing with single CTA
- **Create Profile** — name, email (optional), avatar (camera roll or auto-generated initial)
- **Invite Link** — unique `oula.app/invite/[code]` with native share sheet

### Home Screen
- Grid of connections as large avatar circles
- Filled dot indicator for unread voice notes
- Empty state with share prompt
- Realtime updates via Supabase subscription

### Voice Chat
- Timeline: sent notes right (dark), received notes left (light)
- Deterministic pseudo-random waveform visualization per note
- **Auto-plays** all unheard received notes sequentially through earpiece on open
- Notes expire after first play (shown as "gone")
- **Hold to record** → pulsing red button with live duration timer → release to upload & send
- Push notification sent to recipient on every new note
- Realtime note delivery via Supabase channel

### Profile
- Edit name & photo
- Re-share invite link
- Sign out

### Invite System
- Deep link: `oula://invite/[code]` or `https://oula.app/invite/[code]`
- Opens onboarding if user not signed up, then auto-connects both users
- Already signed-up users auto-connected and taken to voice chat

---

## Push Notifications

Push notifications use the **Expo Push Service** (no FCM/APNs keys needed for development).

For production, configure EAS and add your `projectId` to `app.json`:

```json
"extra": {
  "eas": {
    "projectId": "your-eas-project-id"
  }
}
```

---

## Design Tokens

| Token | Value |
|-------|-------|
| Background | `#FAF9F7` |
| Text | `#1A1A1A` |
| Subtle text | `#8A8A8A` |
| Input bg | `#F0EFED` |
| Record active | `#E05050` |
| Font | DM Sans (400 / 500 / 700) |

---

## Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```
