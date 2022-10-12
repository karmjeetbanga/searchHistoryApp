import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput,Button,Keyboard, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { Feather, Entypo } from "@expo/vector-icons";

 
export default function HomeScreen({navigation}) {

    const [historicalEventsData, setHistoricalEventsData] = useState([]);
    const [filteredData,setFilteredData] = useState(historicalEventsData);
     const [clicked, setClicked] = useState(false);
 
     const handleSearch = (searchKeywords) => {
      let value = searchKeywords.toLowerCase();

      let result = historicalEventsData.filter((data) => {
        if(data.category2) {
           return data.category2.toLowerCase().search(value) != -1;
        }
      });

      setFilteredData(result);
    }

    
    useEffect(() => {
        axios.get('/Users/karmjeet.k/Sites/Stub/searchHistoryApp/data.json')
        .then((response) => {
            setHistoricalEventsData(response.data);
            setFilteredData(response.data);
        })
        .catch((error) => {
            console.log('Error getting fake data: ' + error);
        })
    }, [])

const renderItem = ({ item }) => (
    <View style={styles.Listcontainer}>
      <Text style={styles.textStyle}> {item.date}</Text>
      <Text style={ styles.textStyle}> {item.category2}</Text>
      <Text style={styles.textStyle}> {item.description}</Text>
    </View>
  );

 return (
    <View style={styles.container}>
      <View style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }>
       
      <TextInput 
          style={styles.input} 
          placeholder="Search"
          value={filteredData}
          onChangeText={(event) =>handleSearch(event)}
          onFocus={() => {
            setClicked(true);
          }} />
          {/* <TouchableOpacity  onPress={()=> ShowList()}>
         <Feather
          name="search"
          size={30}
          color="black"
          style={styles.searchIcon}
        />
        </TouchableOpacity>
           {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
              setSearch("");
            }}
          ></Button>
        </View>
      )} */}
      </View>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  Separator: {
        borderBottomColor:'rgb(230, 236, 240)',
        borderBottomWidth: 1,
  },
  Listcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",

    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    height: 40,
     width: "80%",
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignItems:"flex-end"
  },
  searchIcon: {
    padding: 10,
  },

});