import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function ReportScreen() {
  const [photo, setPhoto] = useState(null);
  const [severity, setSeverity] = useState('');
  const [location, setLocation] = useState(null);

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({ base64: true });
    if (!result.cancelled) setPhoto(result.uri);
  };

  const getLocation = async () => {
    const loc = await Location.getCurrentPositionAsync();
    setLocation(loc.coords);
  };

  const submitReport = () => {
    console.log("Photo:", photo);
    console.log("Location:", location);
    console.log("Severity:", severity);
    // You would send this data to a backend or Firebase
  };

  return (
    <View style={styles.container}>
      <Button title="Take Photo" onPress={takePhoto} />
      {photo && <Image source={{ uri: photo }} style={{ width: 100, height: 100 }} />}
      <TextInput
        style={styles.input}
        placeholder="Flood severity (Low, Medium, High)"
        value={severity}
        onChangeText={setSeverity}
      />
      <Button title="Get Location" onPress={getLocation} />
      <Button title="Submit Report" onPress={submitReport} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginVertical: 10, padding: 8 }
});
