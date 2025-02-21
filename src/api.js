//Boilerplate for api.js
const API_KEY = '70d99bb27c1f774b29f06d1e6814529c';  // Replace with your TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

export const fetchTVShows = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/tv/${category}?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    return [];
  }
};

export const searchMedia = async (query, type) => {
  try {
    if (!query) return [];
    const response = await fetch(`${BASE_URL}/search/${type}?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};