import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [text, setText] = useState('');

  const speakText = () => {
    if (text.trim() !== '') {
      Speech.speak(text, { language: 'en' });
    } else {
      Alert.alert('Syötä teksti ensin!');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
        placeholder="Kirjoita jotain..."
        onChangeText={setText}
        value={text}
      />
      <Button
        title="Puhu teksti"
        onPress={speakText}
      />
    </View>
  );
}
