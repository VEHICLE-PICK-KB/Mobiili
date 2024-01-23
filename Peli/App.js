import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert} from 'react-native';
import { useState } from 'react';

export default function App() {

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("Guess a number between 1-100");
  const [count, setCount] = useState(1);
  const Guess = () => {
    let num = parseInt(text1)
    let x = Math.floor(Math.random() * 100) + 1
    if (x<num){
      setText2("Your guess "+num+" was too high");
      setCount(count+1)
      setText1("")
      //Text1 staten resetoituessa on mahdollista testata yritysten määrän näkyminen, painamalla nappulaa ilman syötettä
    }
    else if(x>num){
      setText2("Your guess "+num+" was too low");
      setCount(count+1)
      setText1("")
    }

    else {
      setText2("Guess a number between 1-100")
      Alert.alert("Your guessed the number in "+count+" guesses");
      setCount(0)
    }
    }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize:22 }}>{text2}</Text>
      <TextInput style={{width: 75, borderColor: 'gray', borderWidth: 1}}
      onChangeText={text1 => setText1(text1)} value={text1} keyboardType="numeric" />
      <Button onPress={Guess} title="MAKE A GUESS" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
