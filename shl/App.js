import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput,FlatList } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [text1, setText1] = useState("");
  const [data, setData] = useState([]);

  const add = () => {
      setData([...data, { key: text1 }]);
      setText1("")
      
    
    }
    const clear = () => {
      setData([]);
        
      }



  return (
    <View style={styles.container}>
      <TextInput style={{width: 200, borderColor: 'gray', borderWidth: 1}}
      onChangeText={text1 => setText1(text1)} value={text1} />
      <View style={styles2.container}>
      <Button onPress={add} title="add" />
      <Button onPress={clear} title="clear" />
      </View>
      <Text style={{fontSize:18, color: "blue"}}>Shopping list</Text>
      <FlatList data={data} renderItem={({item}) => <Text>{item.key}</Text>}
       keyExtractor={(item, index) => index.toString()} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:200,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const styles2 = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 100,
    marginTop: 15,
    marginBottom:15
  },
})
