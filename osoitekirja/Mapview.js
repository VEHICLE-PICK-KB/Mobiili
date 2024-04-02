import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Mapview({ route }) {
  const [coordinates, setCoordinates] = useState({
    latitude: 0.9,
    longitude: 0.9,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  const mapRef = useRef(null);

  useEffect(() => {
    const getLocationAsync = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('No permission to get location');
        return;
      }
      setCoordinates({
        latitude: route.params.coordinates.latitude,
        longitude: route.params.coordinates.longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      });
    };

    getLocationAsync();
  }, [route.params.coordinates]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: coordinates.latitudeDelta,
        longitudeDelta: coordinates.longitudeDelta,
      });
    }
  }, [coordinates]);

  // Luodaan muuttuja markerin koordinaateille
  const markerCoordinate = {
    latitude: coordinates.latitude,
    longitude: coordinates.longitude
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: coordinates.latitudeDelta,
          longitudeDelta: coordinates.longitudeDelta,
        }}
      >
        {/* Marker saa koordinaatit tässä */}
        <Marker
          title="Sijainti"
          coordinate={markerCoordinate}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});