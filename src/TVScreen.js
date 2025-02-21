import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchTVShows } from './api';
import DropDownPicker from 'react-native-dropdown-picker';

const TVScreen = ({ navigation }) => {
  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([
    { label: 'Airing Today', value: 'airing_today' },
    { label: 'On The Air', value: 'on_the_air' },
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
  ]);

  useEffect(() => {
    loadTVShows(selectedCategory);
  }, [selectedCategory]);

  const loadTVShows = async (category) => {
    setLoading(true);
    const tvData = await fetchTVShows(category);
    setTVShows(tvData);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Dropdown Picker for TV Categories */}
      <DropDownPicker
        open={open}
        value={selectedCategory}
        items={categories}
        setOpen={setOpen}
        setValue={setSelectedCategory}
        setItems={setCategories}
        containerStyle={styles.dropdown}
      />

      {/* Loading Spinner */}
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={tvShows}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.poster}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.resultTitle}>{item.name}</Text>
                <Text style={styles.resultInfo}>Popularity: {item.popularity.toFixed(2)}</Text>
                <Text style={styles.resultInfo}>Release Date: {item.first_air_date || 'N/A'}</Text>
                <TouchableOpacity
                  style={styles.moreDetailsButton}
                  onPress={() => navigation.navigate('MovieDetails', { movieId: item.id, isTV: true })}
                >
                  <Text style={styles.moreDetailsText}>More Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default TVScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  dropdown: {
    marginBottom: 10,
    zIndex: 1000, // Prevents dropdown from being hidden
  },
  resultItem: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultInfo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  moreDetailsButton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  moreDetailsText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
