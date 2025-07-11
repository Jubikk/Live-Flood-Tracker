import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { fetchPagasaData } from '../services/floodApi';

export default function HomeScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPagasaData().then(setData);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌀 Flood Overview (PAGASA)</Text>
      {data.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.area}>{item.area}</Text>
          <Text>Water Level: {item.level}</Text>
          <Text>Last Updated: {item.timestamp}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  card: { marginBottom: 10, padding: 10, backgroundColor: '#eee', borderRadius: 8 },
  area: { fontWeight: 'bold', fontSize: 16 }
});
