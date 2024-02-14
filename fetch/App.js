import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Button, View, FlatList, ActivityIndicator, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMeals = () => {
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then(response => {
        if (!response.ok)
          throw new Error('Error fetching data: ' + response.statusText);
        return response.json();
      })
      .then(data => {
          setMeals(data.meals);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 50, flex: 1 }}>
          <TextInput
            value={keyword}
            onChangeText={text => setKeyword(text)}
            placeholder="Type keyword..."
          />
          <Button title="Search" onPress={fetchMeals} />
        </View>
        <View style={{ flex: 6 }}>
          <FlatList
            data={meals}
            renderItem={({ item }) => (
              <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 18 }}>{item.strMeal}</Text>
                <Image
                  source={{ uri: item.strMealThumb }}
                  style={{ width: 200, height: 200 }}
                />
              </View>
            )}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
