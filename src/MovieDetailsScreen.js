import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { fetchMovieDetails } from './api';

const { width } = Dimensions.get('window'); // Get device width for responsive scaling

const MovieDetailsScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovieDetails();
  }, []);

  const loadMovieDetails = async () => {
    const isTVShow = route.params?.isTV || false;  
  console.log('Fetching details for ID:', movieId, 'isTV:', isTVShow); 
  const data = await fetchMovieDetails(movieId, isTVShow ? 'tv' : 'movie'); 
  setMovie(data);
  setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back to List</Text>
      </TouchableOpacity>

      {/* Movie Title */}
      <Text style={styles.title}>{movie.title}</Text>

      {/* Movie Poster (Perfectly Fitted) */}
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />

      {/* Movie Description */}
      <Text style={styles.description}>{movie.overview}</Text>

      {/* Movie Details */}
      <Text style={styles.details}>
    Popularity: {movie.popularity ? movie.popularity.toFixed(2) : 'N/A'} | 
  Release Date: {movie.release_date || 'N/A'}
</Text>

    </ScrollView>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    color: '#007bff',
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  poster: {
    width: width * 0.85, // 85% of screen width for better scaling
    height: width * 1.1, // Scaled height for better fit
    resizeMode: 'cover', // Ensures it fills correctly
    borderRadius: 10,
    alignSelf: 'center',
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    marginVertical: 15,
    margin:10
  },
  details: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
});
