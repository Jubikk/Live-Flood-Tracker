import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen() {
  const [reports, setReports] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    Location.getCurrentPositionAsync().then((loc) => {
      setLocation(loc.coords);
    });

    // TODO: Replace with real data from Firebase or backend
    setReports([
      { lat: 14.604, lng: 120.982, severity: 'High', user: 'Joebeck' },
    ]);
  }, []);

  return (
    <MapView style={styles.map}
      initialRegion={{
        latitude: 14.5995,
        longitude: 120.9842,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      {reports.map((r, i) => (
        <Marker key={i} coordinate={{ latitude: r.lat, longitude: r.lng }} title={r.severity} />
      ))}

      {location && (
        <Circle
          center={location}
          radius={1000}
          fillColor="rgba(0,150,255,0.1)"
          strokeColor="blue"
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 }
});
