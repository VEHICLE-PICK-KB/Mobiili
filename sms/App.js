import * as Contacts from 'expo-contacts';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useState} from 'react';

export default function App() {

  const [contact, setContact] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
    const { data } = await Contacts.getContactsAsync(
    { fields: [Contacts.Fields.PhoneNumbers] }
    );
    setContact([...data.map((contact, index) => ({ ...contact, key: index }))]);
    
    }
   }
  
   return (
    <View style={styles.container}>
    <FlatList data={contact} renderItem={({item}) => <Text>{item.firstName}: {item.phoneNumbers && item.phoneNumbers[0]?.number}</Text>}
       keyExtractor={(item, index) => index.toString()} />
    <Button title="Get Contacts" onPress={getContacts} />
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
