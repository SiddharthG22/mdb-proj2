import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Button, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import { MovieCell } from "./components/MovieCell";
import { styles } from "./MovieListScreen.styles";

const TABLE_DATA = require("../../assets/movies.json");

export default function MovieListScreen({ navigation, route }) {
  const [search, setSearch] = useState("");
  const [actors, setActors] = useState([]);

  const selectedMovie = (movieItem) => {
    navigation.navigate("MovieDetail", { movieItem });
  };

  const selectedFilterButton = () => {
    navigation.navigate("MovieFilter", { allActors: actors });
  };

  useEffect(() => {
    if (route.params?.selectedActors) {
      setActors(route.params?.selectedActors);
    }
  }, [route.params?.selectedActors]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Filter" onPress={selectedFilterButton} />
      ),
    });
  }, []);


  const renderItem = ({ item }) => {
    const overlapFound = (listA, listB) => {
      let foundActor = false;
      listA.forEach((x) => {
        if (listB.includes(x)) {
          foundActor = true;
        }
      });
      return foundActor;
    };

    let meetsSearchCriteria = item.title.toLowerCase().includes(search.toLowerCase());
    let meetsActorsCriteria = actors.length === 0 || overlapFound(actors, item.actors);

    if (meetsSearchCriteria && meetsActorsCriteria) {
      return (
        <TouchableOpacity onPress={() => selectedMovie(item)}>
          <MovieCell movieItem={item} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search..."
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      <FlatList
        data={TABLE_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}
