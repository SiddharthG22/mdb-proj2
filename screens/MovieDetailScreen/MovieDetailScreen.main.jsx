import React from "react";
import { SafeAreaView, Text, Image, ScrollView } from "react-native";
import { styles } from "./MovieDetailScreen.styles";

export default function MovieDetailScreen({ route }) {
  const { movieItem } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: movieItem.posterurl }}
          style={styles.moviePoster}
        />
        <Text style={styles.h1}>{movieItem.title}</Text>
        <Text style={styles.h3}>Released in {movieItem.year}</Text>
        <Text style={styles.h3}>{movieItem.genres.join(", ")}</Text>
        <Text style={styles.h3}>Starring: {movieItem.actors.join(", ")}</Text>
        <Text style={styles.h4}>{movieItem.storyline}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
