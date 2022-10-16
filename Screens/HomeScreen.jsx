import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import axios from "axios";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import Feather from "react-native-vector-icons/Feather";
Feather.loadFont();

export default function HomeScreen() {
  const [historicalEventsData, setHistoricalEventsData] = useState([]);
  const [filteredData, setFilteredData] = useState(historicalEventsData);
  const [searchSuggestionData, setSearchSuggestionData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/karmjeetbanga/event-history/main/eventHistoryData.json"
      )
      .then((response) => {
        setHistoricalEventsData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }, []);

  const handleSearch = (searchKeywords) => {
    let value = searchKeywords.toLowerCase();
    let result = historicalEventsData.filter((data) => {
      if (data.category2) {
        return data.category2.toLowerCase().search(value) != -1;
      }
    });
    setFilteredData(result);
  };

  const onSearchBarClearEvent = () => {
    setFilteredData(historicalEventsData);
  };

  const getSuggestionList = () => {
    let category2 = historicalEventsData
      .map((item) => {
        return item.category2;
      })
      .filter((item) => {
        return item != null || item != undefined;
      })
      .sort();

    let uniqueCategory2 = [...new Set(category2)];

    let searchKeywords = uniqueCategory2.map((item, index) => {
      return { id: index, title: item };
    });

    setSearchSuggestionData(searchKeywords);
  };

  const onOpenSuggestionsList = () => {
    if (searchSuggestionData.length === 0) {
      getSuggestionList();
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.listContainer}>
      <Text style={styles.headeStyle}> {item.category2}</Text>
      <Text style={styles.textStyle}> {item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <AutocompleteDropdown
        inputContainerStyle={styles.searchBar}
        suggestionsListContainerStyle={styles.suggestionsListContainer}
        onChangeText={(event) => handleSearch(event)}
        onSelectItem={(item) => {
          item && handleSearch(item.title);
        }}
        onClear={onSearchBarClearEvent}
        dataSet={searchSuggestionData}
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={true}
        debounce={300}
        textInputProps={{
          placeholder: "Search history by place (eg. Asia, Africa etc.)",
          autoCorrect: true,
          autoCapitalize: "none",
        }}
        onOpenSuggestionsList={onOpenSuggestionsList}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.Separator} />}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    paddingTop: 10,
  },
  Separator: {
    borderBottomColor: "rgb(230, 236, 240)",
    borderBottomWidth: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#F8F9F9",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  headeStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(0, 0, 0)",
    padding: 10,
  },
  textStyle: {
    flexWrap: "wrap",
    paddingBottom: 5,
    paddingTop: 5,
    fontSize: 16,
    color: "rgb(0, 0, 0)",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: 40,
    borderRadius: 5,
    margin: 10,
    backgroundColor: "rgb(230, 236, 240)",
    padding: 10,
  },
  itemText: {
    fontSize: 16,
    color: "rgb(0, 0, 0)",
    padding: 10,
  },
  item: {
    backgroundColor: "#F8F9F9",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(0, 0, 0)",
    padding: 10,
  },
  searchBar: {
    margin: 20,
    borderWidth: 2,
    borderRadius: 10,
    padding: 6,
    backgroundColor: "rgb(230, 236, 240)",
  },
  suggestionsListContainer: {
    width: "90%",
    marginLeft: 20,
    marginTop: 30,
    backgroundColor: "rgb(230, 236, 240)",
  },
});
