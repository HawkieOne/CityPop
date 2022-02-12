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
    axios.get(`http://api.geonames.org/searchJSON?name_equals=${text}&username=weknowit&maxRows=1`)
    .then((response) => {
      setResults(response.data);
      console.log("TYPE");
      console.log(searchType);
      if (searchType === "city") {
        navigation.push("CityResults");
      } else if (searchType === "country") {
        navigation.push("CountryResults");
      }
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
            placeholder={'Enter a ' + searchType}
          />
          <TouchableOpacity
            onPress={buttonClickedHandler}
            style={styles.roundButton1}>
              <Icon name="search" size={30} style={styles.icon} />
          </TouchableOpacity>
        </View> 

    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FCFCFC',
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    marginTop: 'auto',
    textAlign: 'center'
  },
  searchView: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#39B77C',
    textAlign: 'center'
  },
  roundButton1: {
    alignSelf: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#39B77C',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
  },
});
