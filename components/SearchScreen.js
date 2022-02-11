import React, { useEffect } from 'react'
import { SearchContext } from "../shared/contexts";
import { StyleSheet, Text, View, Button, BackHandler, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackButton from './BackButton';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { resultState, searchTypeState } from '../atoms/SearchType';
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen() {

  const navigation = useNavigation();

  const searchType = useRecoilValue(searchTypeState);
  const [results, setResults] = useRecoilState(resultState);

  const [text, onChangeText] = React.useState("");

  const buttonClickedHandler = () => {
    axios.get(`http://api.geonames.org/searchJSON?name_equals=ume%C3%A5&username=weknowit&maxRows=1`)
    .then((response) => {
      // console.log(response.data); 
      setResults(response.data);
      console.log(searchType);
      if (searchType === "city") {
        navigation.push("CityResults");
      } else if (searchType === "country") {}
        navigation.push("CountryResults");
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <View style={styles.screen}>

        <BackButton />

        <Text style={styles.title}>SEARCH BY {searchType.toUpperCase()}</Text>

        <View style={styles.searchView}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="useless placeholder"
          />
          <TouchableOpacity
            onPress={buttonClickedHandler}
            style={styles.roundButton1}>
              <Icon name="search" size={30} color="#D08770" style={styles.backIcon} />
          </TouchableOpacity>
        </View> 

    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#2E3440',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    marginTop: 'auto',
  },
  searchView: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  roundButton1: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    borderWidth: 1,
  },
});
