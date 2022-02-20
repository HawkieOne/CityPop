import React, { useEffect, useState } from 'react'
import { SearchContext } from "../shared/contexts";
import { StyleSheet, Text, View, Button, BackHandler, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackButton from './BackButton';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { resultCityState, searchTypeState, resultCountryState } from '../atoms/atoms';
import { useNavigation } from '@react-navigation/native';
const { getCode } = require('country-list');

export default function SearchScreen() {

  const navigation = useNavigation();

  const searchType = useRecoilValue(searchTypeState);
  const [cityResults, setCityResults] = useRecoilState(resultCityState);
  const [countryResults, setCountryResults] = useRecoilState(resultCountryState);
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [text, onChangeText] = React.useState("");

  const buttonClickedHandler = () => {
    if (searchType === 'city') {
      axios.get(`http://api.geonames.org/searchJSON?name_equals=${text}&username=weknowit&maxRows=1`)
      .then((response) => {
        if (response.status !== "OK") {
          showErrorMessage("The server have a bad answer");
          return;
        }
        if (response.data.totalResultsCount === 0) {
          showErrorMessage("The city was not found");
          return;
        }
        setCityResults(response.data.geonames[0]);
        navigation.push("CityResults");
      })
      .catch(error => {
        console.log(error);
      });
    } else if (searchType === 'country') {
      const countryCode = getCode(text);
      axios.get(`http://api.geonames.org/searchJSON?q=${text}&country=${countryCode}&featureClass=P&orderby=population&username=weknowit&maxRows=10`)
      .then((response) => {
        if (response.status !== "OK") {
          showErrorMessage("The server have a bad answer");
          return;
        }
        if (response.data.totalResultsCount === 0) {
          showErrorMessage("The country was not found");
          return;
        }
        setCityResults(response.data.geonames[0]);
        navigation.push("CountryResults");
      })
      .catch(error => {
        console.log(error);
      });
    }
  };

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setVisible(true);
  }

  const onDismissSnackBar = () => {
    setErrorMessage("");
    setVisible(false);
  }

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

        <Text style={styles.errorMessage}>{errorMessage}</Text>

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
    marginVertical: 'auto',
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
  errorMessage: {
    height: "20px",
    color: "red",
  }
});
