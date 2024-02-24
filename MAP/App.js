import React, { useState } from 'react';
import { StatusBar, Button, TextInput, View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  const handleShow = () => {
    fetch(`https://geocode.maps.co/search?q=${(address)}&api_key=65d9d60f3b280028582802dmj278e21`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const firstResult = data[0];
          const { lat, lon } = firstResult;
          setCoordinates({
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221,
          });
        } else {
          console.error("Ei koordinaatteja saatavilla");
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapstyle}
        region={coordinates}
      >
        <Marker
          title="Sijainti"
          coordinate={{ latitude: coordinates.latitude, longitude: coordinates.longitude }}
        />
      </MapView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Syötä osoite"
          value={address}
          onChangeText={text => setAddress(text)}
        />
        <Button title="Show" onPress={handleShow} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapstyle: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
