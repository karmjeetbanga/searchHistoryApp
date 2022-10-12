import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput,Button,Keyboard, TouchableOpacity} from 'react-native';
import axios from 'axios';
 
export default function HomeScreen(){

    const [historicalEventsData, setHistoricalEventsData] = useState([]);
    const [filteredData,setFilteredData] = useState(historicalEventsData);
 
     const handleSearch = (searchKeywords) => {
      let value = searchKeywords.toLowerCase();

      let result = historicalEventsData.filter((data) => {
        if(data.category2) {
           return data.category2.toLowerCase().search(value) != -1;
        }
      });

      setFilteredData(result);
    };

      useEffect(() => {
        axios.get('/Users/karmjeet.k/Sites/searchHistoryApp/Stub/data.json')
        .then((response) => {
         // console.log(response.data);
            setHistoricalEventsData(response.data);
            setFilteredData(response.data);
        })
        .catch((error) => {
            console.log('Error: ' + error);
        })
    }, [])

const renderItem = ({ item }) => (
    <View style={styles.listContainer}>
      <Text style={styles.headeStyle}> {item.category2}</Text>
      <Text style={styles.textStyle}> {item.description}</Text>
    </View>
  );

 return (
    <View style={styles.container}>
    <TextInput 
          style={styles.input} 
          placeholder="Search history by place (eg. Asia, Africa etc.)"
          value={filteredData}
          onChangeText={(event) =>handleSearch(event)}
          />
     <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.Separator} />}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  Separator: {
        borderBottomColor:'rgb(230, 236, 240)',
        borderBottomWidth: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#F8F9F9',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontWeight: 'bold',
    color: 'rgb(0, 0, 0)',
    padding: 10,
  },
   textStyle: {
    flexWrap: 'wrap',
    paddingBottom: 5,
    paddingTop: 5,
    fontSize: 16,
    color: 'rgb(0, 0, 0)',  
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
  input: {
    width: "90%",
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "rgb(230, 236, 240)",
    alignItems: "center",
  },
  searchIcon: {
    padding: 10,
  },

});