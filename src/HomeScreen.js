import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchMovies } from './api';

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      const movieData = await fetchMovies('popular');  // Fetch "popular" movies
      setMovies(movieData);
      setLoading(false);
    };
    getMovies();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}>
      <View style={{ margin: 10 }}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={{ width: 100, height: 150 }} />
        <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : 
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      }
    </View>
  );
};

export default HomeScreen;
