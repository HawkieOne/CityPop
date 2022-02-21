import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackButton from './BackButton';
import axios from 'axios';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { resultCityState, searchTypeState, resultCountryState } from '../atoms/atoms';
import { useNavigation } from '@react-navigation/native';
const { getCode } = require('country-list');

export default function SearchScreen() {

  const navigation = useNavigation();

  const searchType = useRecoilValue(searchTypeState);
  const setCityResults = useSetRecoilState(resultCityState);
  const setCountryResults = useSetRecoilState(resultCountryState);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

  const [text, onChangeText] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  const buttonClickedHandler = () => {
    setShowLoadingIndicator(true);
    if (searchType === 'city') {
      axios.get(`http://api.geonames.org/searchJSON?name_equals=${text}&username=weknowit&maxRows=1`)
      .then((response) => {
        console.log(response);
        setShowLoadingIndicator(false);        
        if (response.status !== 200) {
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
      axios.get(`http://api.geonames.org/searchJSON?q=${text}&country=${countryCode}&featureClass=P&orderby=population&username=weknowit&maxRows=20`)
      .then((response) => {
        setShowLoadingIndicator(false);
        if (response.status !== 200) {
          showErrorMessage("The server have a bad answer");          
          return;
        }
        if (response.data.totalResultsCount === 0) {
          showErrorMessage("The country was not found");
          return;
        }
        setCountryResults(response.data);
        navigation.push("CountryResults");
      })
      .catch(error => {
        console.log(error);
      });
    }
  };

  const showErrorMessage = (message) => {
    setErrorMessage(message);
  }

  return (
    <View style={styles.screen}>

        <BackButton />

        <Text style={styles.title}>SEARCH BY {searchType.toUpperCase()}</Text>

        <View style={styles.searchView}>

          // Only visible when error message is not null
          <Text style={[styles.errorMessage, errorMessage && styles.errorMessageActive]}>{errorMessage}</Text>

          <View style={styles.inputArea}>
            <TextInput
              // * styles.inputFocus is active when the input has focus
              style={inputFocused ? styles.inputFocus : styles.input}
              onChangeText={onChangeText}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              value={text}
              placeholder={'Enter a ' + searchType}
              autoFocus={true}
              returnKeyType="search"
            />
          </View>
          
          <TouchableOpacity
            onPress={buttonClickedHandler}
            style={styles.roundButton1}>
              <Icon name="search" size={30} style={styles.icon} />
          </TouchableOpacity>          
        </View> 

        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="large" color="black" animating={showLoadingIndicator}/>        
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
    marginVertical: 'auto',
  },
  inputArea: {
    borderBottomWidth: 1,
    borderBottomColor: '#39B77C',
    margin: 12,
  },
  input: {
    height: 40,    
    padding: 10,
    textAlign: 'left',
  },
  inputFocus: {
    height: 40,    
    padding: 10,
    borderWidth: 1,
    borderColor: 'red',
    textAlign: 'left',
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
    height: 30,
    color: 'white',
    marginHorizontal: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  errorMessageActive: {
    backgroundColor: '#BF616A',
  },
  loadingIndicator: {
    marginBottom: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
