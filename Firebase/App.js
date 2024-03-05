import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyDywYQxsRdxlnoo-SEzUitMHLDej-InATE",
    authDomain: "fir-test-e3da4.firebaseapp.com",
    databaseURL: "https://fir-test-e3da4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fir-test-e3da4",
    storageBucket: "fir-test-e3da4.appspot.com",
    messagingSenderId: "294009518718",
    appId: "1:294009518718:web:09dd6556e2b08c2010b62f"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  
  const [product, setProduct] = useState({
    id: null,
    title: '',
    amount: ''
  });
  const [items, setItems] = useState([]);

  const saveItem = () => {
    const newItemRef = push(ref(database, 'items/'), product);
    const newItemKey = newItemRef.key;
    setProduct({id: newItemKey, title: '', amount: '' });
  }

  const deleteItem = (itemId) => {
    remove(ref(database, `items/${itemId}`));
  }

  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const keys = Object.keys(data);
        const itemsArray = keys.map((key) => ({ ...data[key], id: key }));
        setItems(itemsArray);
      } else {
        setItems([]);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Product'
        style={styles.input}
        onChangeText={(text) => setProduct({ ...product, title: text })}
        value={product.title}
      />  
      <TextInput
        placeholder='Amount'
        style={styles.input}
        onChangeText={(text) => setProduct({ ...product, amount: text })}
        value={product.amount}
      />      
      <Button onPress={saveItem} title="Save" /> 
      <Text style={styles.title}>Shopping List</Text>
      <FlatList 
        style={styles.list}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.title}: {item.amount}</Text>
            <Button title="Delete" onPress={() => deleteItem(item.id)}  />
          </View>
        )} 
        data={items} 
      />      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    marginTop: 10,
    width: '50%',
  },
  listItem: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listItemText: {
    fontSize: 18,
  },
});