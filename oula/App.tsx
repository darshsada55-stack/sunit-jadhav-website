import React from 'react';
import { View, Text } from 'react-native';

console.log('APP STARTED');

export default function App() {
  console.log('APP RENDERED');
  return (
    <View style={{ flex: 1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 32 }}>Hello</Text>
    </View>
  );
}
