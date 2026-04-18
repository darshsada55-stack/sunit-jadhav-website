console.log('APP STARTED');

import React from 'react';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 32 }}>Hello</Text>
    </View>
  );
}
