import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, FlatList, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

export default function Places({ navigation }) {
  const db = SQLite.openDatabase('addresses.db');
  const [address, setAddress] = useState('');
  const [addressList, setAddressList] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists addresses (id integer primary key not null, address text);');
    }, null, updateAddressList);
  }, []);

  const saveAddress = () => {
    db.transaction(tx => {
      tx.executeSql('insert into addresses (address) values (?);', [address]);
    }, null, updateAddressList);
  }

  const updateAddressList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from addresses;', [], (_, { rows }) =>
        setAddressList(rows._array)
      );
    });
  }

  const deleteAddress = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from addresses where id = ?;`, [id]);
      }, null, updateAddressList
    )
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  const handleShow = (address) => {
    fetch(`https://geocode.maps.co/search?q=${(address)}&api_key=65d9d60f3b280028582802dmj278e21`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const firstResult = data[0];
          const { lat, lon } = firstResult;
          navigation.navigate('Map', {
            coordinates: {
              latitude: parseFloat(lat),
              longitude: parseFloat(lon),
              latitudeDelta: 0.0322,
              longitudeDelta: 0.0221,
            }
          });
        } else {
          Alert.alert("Address not found");
        }
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this address?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Delete canceled"),
          style: "cancel"
        },
        { text: "Delete", onPress: () => deleteAddress(id) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 30, fontSize: 20 }}>PLACEFINDER</Text>
      <Input
        placeholder='Type in address'
        containerStyle={{ marginTop: 30, width: '80%' }}
        onChangeText={(address) => setAddress(address)}
        value={address}
      />
      <Button
        title="Save"
        onPress={saveAddress}
        buttonStyle={{ marginTop: 20 }}
      />
      <Text style={{ marginTop: 20, fontSize: 20 }}>Saved Addresses</Text>
      <FlatList
        style={{ width: '100%' }}
        data={addressList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.addressText} onLongPress={() => handleDelete(item.id)}>{item.address}</Text>
            <TouchableOpacity onPress={() => handleShow(item.address)}>
            <Text style={styles.showText}>Show on Map</Text>
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={listSeparator}
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
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addressText: {
    fontSize: 18,
  },
  showText: {
    color: 'blue',
    marginRight: 0,
  },
});