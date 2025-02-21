// import React, { useState, useEffect } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { fetchMovies } from './src/api';

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './src/HomeScreen'; 
// import MovieDetailsScreen from './src/MovieDetailsScreen'; 

// const Stack = createStackNavigator();


// export default function App() {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
  

//   useEffect(() => {
//     const getMovies = async () => {
//       const movieData = await fetchMovies('popular'); // Use 'popular' endpoint
//       setMovies(movieData);
//       setLoading(false);
//     };
//     getMovies();
//   }, []);

//   const renderItem = ({ item }) => {
//     return (
//       <TouchableOpacity onPress={() => handleMoviePress(item.id)}>
//         <View style={{ margin: 10 }}>
//           <Image
//             source={{
//               uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
//             }}
//             style={{ width: 100, height: 150 }}
//           />
//           <Text>{item.title}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const handleMoviePress = (id) => {
//     console.log('Movie ID:', id);
//     // Navigate to a movie details page (you'll handle the details on the next page)
//   };

//   return (
//     <View style={{ flex: 1, padding: 10 }}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <FlatList
//           data={movies}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={renderItem}
//         />
        
//       )}
      
      
//     </View>
//   );
// }

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MoviesScreen from './src/MoviesScreen';
import TVScreen from './src/TVScreen';
import SearchScreen from './src/SearchScreen';
import MovieDetailsScreen from './src/MovieDetailsScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Movies" component={MoviesScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="TV Shows" component={TVScreen} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
